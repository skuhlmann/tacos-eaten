import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import api from '../../services/api'
import trackerBuilder from '../../services/trackerBuilder'

class TrackerNew extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      count: '',
      date: this.buildDate(),
      redirectToTracker: false,
      slug: ''
    }

    this.submitting = false;
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
    this.submitting = true;

    let newTracker = trackerBuilder.addMetaData({
      name: this.state.name
    })

    let newEntry = {
      count: this.state.count,
      date: this.state.date,
    }

    api.newTracker(newTracker, newEntry).then(res => {
      console.log(res)
      this.setState({
        name: '',
        count: '',
        date: this.buildDate(),
        slug: res.slug,
        redirectToTracker: true,
      })
    })
  }

  invalid() {
    let invalidInput = this.state.name.length < 2 || this.state.count < 1
    return this.submitting || invalidInput
  }

  render() {
    const disableSubmit = this.invalid()
    const path = `/tracker/${this.state.slug}`

    if (this.state.redirectToTracker) {
      return <Redirect to={path} />;
    }

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
            <input className="btn-lg btn-light form__btn" type="submit" value="Start Tracking" disabled={disableSubmit}/>
          </div>
        </div>
      </form>
    )
  }

}

export default TrackerNew