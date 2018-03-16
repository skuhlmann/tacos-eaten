import React, { Component } from 'react';
import { Link } from "react-router-dom";

class TrackerList extends Component {
  renderLoading() {
    return <div>Loading...</div>
  }

  renderError() {
    return <div>There's an error</div>
  }

  renderTrackers() {
    let trackerList = this.buildList()

    return (
      <div>
        <h3>Your Trackers</h3>
        { trackerList }
      </div>
    )
  }
  
  buildList() {
    return this.props.trackers.map(tracker => {
      let linkPath = `/tracker/${tracker.id}`

      return (
        <div key={tracker.id}>
          <Link to={linkPath}>{tracker.name}</Link>
        </div>
      )
    })
  }

  render() {
    if (this.props.loading) {
      return this.renderLoading()
    } else if (this.props.trackers) {
      return this.renderTrackers()
    } else {
      return this.renderError()
    }
  }
}

export default TrackerList