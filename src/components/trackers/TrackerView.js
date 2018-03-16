import React, { Component } from 'react';
import TrackerLineChart from './TrackerLineChart'
import EntryNew from './EntryNew'


class TrackerView extends Component {
  renderLoading() {
    return <div>Loading...</div>
  }

  renderError() {
    return <div>There's an error</div>
  }

  renderTracker() {
    const { name, slug } = this.props.tracker

    return (
      <div>
        <h2>{name}</h2>
        <EntryNew tracker={this.props.tracker} />
        <TrackerLineChart entries={this.props.entries} title={this.props.tracker.name}/>
        <div>Slug: {slug}</div>
      </div>
    )
  }

  render() {
    if (this.props.loading) {
      return this.renderLoading()
    } else if (this.props.tracker) {
      return this.renderTracker()
    } else {
      return this.renderError()
    }
  }
}

export default TrackerView