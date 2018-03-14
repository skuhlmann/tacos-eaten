import React, { Component } from 'react';
import trackerApi from '../../services/trackerApi'

class TrackerNew extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      count: '',
      date: new Date()
    }
  }

  handleChange = (e) => {
    let update = {}
    update[e.target.name] = e.target.value

    this.setState(update)
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let newTracker = {
      name: this.state.name
    }

    this.setState({name: ''}, () => {
      trackerApi.add(newTracker)
    })


    //this needs to create the tracker doc and the collection of entries
    //and disable the form
  }

  render() {
    let disableSubmit = this.state.name.length < 2;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          I had 
          <input type="number" 
            name="count"
            value={this.state.count} 
            onChange={this.handleChange}/>
        </label>
        <label>
          <input type="text" 
            name="name"
            value={this.state.name} 
            onChange={this.handleChange}/>
        </label>

        <input type="submit" value="Submit" disabled={disableSubmit}/>
      </form>
    )
  }

}

export default TrackerNew