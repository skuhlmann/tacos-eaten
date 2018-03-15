import React, { Component } from 'react';
import api from '../../services/api'

class TrackerList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      slug: '',
      allTrackers: []
    }
  }

  componentDidMount() {
    trackerApi.find('X71KpGAD40LX5DZqv1af').then(tracker => {
      this.setState({
        name: tracker.name,
        slug: tracker.slug
      })
    })

    trackerApi.all().onSnapshot(collection => {
      let trackers = collection.docs.map(doc => {
        let tracker = doc.data()
        tracker.id = doc.id
        return tracker
      })

      this.setState({ allTrackers: trackers })
    })
  }

  buildList() {
    return this.state.allTrackers.map(tracker => {
      return (
        <p key={tracker.id}>whaaaa</p>
      )
    })
  }

  render() {
    let trackerList = this.buildList()

    return (
      <div>
        <p>All trackers</p>
        <p>{this.state.name}</p>
        <hr />  
        { trackerList }
      </div>
    )
  }
}

export default TrackerList