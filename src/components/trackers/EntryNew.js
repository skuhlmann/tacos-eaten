import React, { Component } from 'react';
import api from '../../services/api'

class EntryNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

    let newEntry = {
      count: this.state.count,
      date: this.state.date,
    }

    this.setState({
      count: '',
      date: this.buildDate(),
    }, () => {
      api.entries.add(this.props.tracker.id, newEntry)
    })
  }

  invalid() {
    return this.state.count < 1
  }

  render() {
    let disableSubmit = this.invalid()

    return (
      <form onSubmit={this.handleSubmit}>

        <div className="form-row">
          <div className="col-1">
            <label className="form__text--entry">I ate </label>
          </div>

          <div className="col-1">
            <input 
              className="form-control form__text--entry"
              type="number"
              placeholder="33"
              name="count"
              value={this.state.count} 
              onChange={this.handleChange}/>
          </div>

          <div className="col-2">
            <p className="form__text--entry"> more { this.props.tracker.name } on</p>
          </div>

          <div className="col-5">
            <input 
              className="form-control form__text--entry form__text--date"
              type="date" 
              name="date"
              value={this.state.date} 
              onChange={this.handleChange}/>
          </div>

          <div className="col-3">
            <input className="btn-lg btn-light form__btn" type="submit" value="Add" disabled={disableSubmit}/>
          </div>
        </div>

        <div className="form-row">
        </div>
      </form>
    )
  }

}

export default EntryNew