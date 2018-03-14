import React, { Component } from 'react';


class TrackerList extends Component {
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

export default TrackerList