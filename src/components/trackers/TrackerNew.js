import React, { Component } from 'react';
import trackerApi from '../../services/trackerApi'

class TrackerNew extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      count: '',
      date: new Date().toISOString().split('T')[0]
    }

    console.log(this.state.date)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    //going to need to deal with the date format

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
            placeholder="33"
            name="count"
            value={this.state.count} 
            onChange={this.handleChange}/>
        </label>
        <label>
          <input type="text" 
            placeholder="Tacos"
            name="name"
            value={this.state.name} 
            onChange={this.handleChange}/>
        </label>

        <label>
          on
          <input type="date" 
            name="date"
            value={this.state.date} 
            onChange={this.handleChange}/>
        </label>

        <input type="submit" value="Submit" disabled={disableSubmit}/>
      </form>
    )
  }

}

export default TrackerNew