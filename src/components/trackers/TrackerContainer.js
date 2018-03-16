import React, { Component } from 'react';
import api from '../../services/api'
import TrackerView from './TrackerView'

class TrackerContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    //will need some error handling on unfound slugs
    const trackerSlug = this.props.match.params.slug

    api.trackers.search({slug: trackerSlug}).then(res => {
      this.trackerApiUnsub = api.trackers.get(res.docs[0].id)
      .onSnapshot(tracker => {
  
        this.entryApiUnsub = api.entries.all(tracker.id)
          .onSnapshot(collection => {
  
            let entries = collection.docs.map(doc => {
              let entry = doc.data()
              entry.id = doc.id
              return entry
            })
  
            let fmTracker = tracker.data()
            fmTracker.id = tracker.id
  
            this.setState({
              loading: false,
              tracker: fmTracker,
              entries: entries
            })
         })
      })
    })

  }

  componentWillUnmount() {
    this.trackerApiUnsub();
    this.entryApiUnsub();
  }

  render() {
    return <TrackerView {...this.state} />
  }
}

export default TrackerContainer