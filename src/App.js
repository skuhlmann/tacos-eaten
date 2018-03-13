import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { db } from './firebase'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      slug: '',
      userToken: '',
      tacos: [],
      newTaco: {
        name: ''
      }
    }
  }

  componentDidMount() {
    db.doc('tacos/X71KpGAD40LX5DZqv1af')
      .get()
      .then(doc => this.setState({ 
          name: doc.data().name,
          slug: doc.data().slug
        }))
        
    db.collection('tacos')
      .onSnapshot(collection => {

        const tacos = collection.docs.map(doc => {
          let taco = doc.data()
          taco.id = doc.id
          return taco
        })
        this.setState({ tacos: tacos })
      })
  }

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(this.form);
    const tacoDetails = {};

    for (let pair of formData.entries()) {
      tacoDetails[pair[0]] = pair[1];
    }

    db.collection('tacos').add(tacoDetails)

    this.setState({ newTaco: {name: ''} })
  }

  handleDelete = (taco, e) => {
    db.collection('tacos')
      .doc(taco.id)
      .delete()
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tacos Eaten</h1>
        </header>

        <p>{ this.state.name }</p>
        <p>{ this.state.slug }</p>

        <hr />

          {
            this.state.tacos &&
              this.state.tacos.map((taco, index) => 
                <div key={index}>
                  {taco.name} 
                  <button onClick={this.handleDelete.bind(this, taco)}>Kill</button>
                </div>
              )
          }

        <hr />

        <form onSubmit={this.handleSubmit} name="tacoForm" ref={(el) => this.form = el}>
          <label>Type of taco</label>
          <input type="text" name="name" defaultValue={this.state.newTaco.name}/>
          <button type="submit">Enter</button>
        </form>
      </div>
    );
  }
}

export default App;
