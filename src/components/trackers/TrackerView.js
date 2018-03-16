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
    const entries = this.renderEntries()

    return (
      <div>
        <h2>{name}</h2>
        <TrackerLineChart entries={this.props.entries} />
        <div>Slug: {slug}</div>
        {entries}
        <EntryNew tracker={this.props.tracker} />
      </div>
    )
  }

  renderEntries() {
    return this.props.entries.map(entry => {
      return <p key={entry.id}>{entry.count}</p>
    })
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