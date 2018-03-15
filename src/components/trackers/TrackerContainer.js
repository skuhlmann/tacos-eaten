import React, { Component } from 'react';
import api from '../../services/api'
import TrackerView from './TrackerView'

class TrackerContainer extends Component {
  state = { loading: true }

  componentDidMount() {
    this.apiUnsub = api.trackers.get('X71KpGAD40LX5DZqv1af')
      .onSnapshot(tracker => {

        api.entries.all(tracker.id)
          .onSnapshot(collection => {

            let entries = collection.docs.map(doc => {
              let entry = doc.data()
              entry.id = doc.id
              return entry
            })

            this.setState({
              loading: false,
              tracker: tracker.data(),
              entries: entries
            })
         })
      })
  }

  componentWillUnmount() {
    this.apiUnsub();
  }

  render() {
    return <TrackerView {...this.state} />
  }
}

export default TrackerContainer