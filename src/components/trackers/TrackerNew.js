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

        <div className="form-row">
          <div className="col-2">
            <label className="form__text">I ate </label>
          </div>

          <div className="col-3">
            <input 
              className="form-control form__text"
              type="number"
              placeholder="33"
              name="count"
              value={this.state.count} 
              onChange={this.handleChange}/>
          </div>

          <div className="col-7">
            <input 
              className="form-control form__text"
              type="text" 
              placeholder="Tacos"
              name="name"
              value={this.state.name} 
              onChange={this.handleChange}/>
          </div>
        </div>

        <div className="form-row justify-content-center">
          <div className="col-2">
            <label className="form__text">on</label>
          </div>

          <div className="col-7">
            <input 
              className="form-control form__text form__text--date"
              type="date" 
              name="date"
              value={this.state.date} 
              onChange={this.handleChange}/>
          </div>
        </div>

        <div className="form-row">
          <div className="col-12">
            <input className="btn-lg btn-light" type="submit" value="Start Tracking" disabled={disableSubmit}/>
          </div>
        </div>
      </form>
    )
  }

}

export default TrackerNew