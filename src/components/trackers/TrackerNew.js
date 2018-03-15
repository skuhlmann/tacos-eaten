import React, { Component } from 'react';
import api from '../../services/api'
import trackerBuilder from '../../services/trackerBuilder'

class TrackerNew extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      count: '',
      date: this.buildDate()
    }
  }

  buildDate() {
    return new Date().toISOString().split('T')[0]
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let newTracker = trackerBuilder.addMetaData({
      name: this.state.name
    })

    let newEntry = {
      count: this.state.count,
      date: this.state.date,
    }

    this.setState({
      name: '',
      count: '',
      date: this.buildDate(),
    }, () => {
      api.newTracker(newTracker, newEntry)
    })
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