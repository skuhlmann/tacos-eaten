import React, { Component } from 'react';
import trackerApi from '../../services/trackerApi'
import TrackerView from './TrackerView'

class TrackerContainer extends Component {
  state = { loading: true }

  componentDidMount() {
  // one time
  //   trackerApi.find('X71KpGAD40LX5DZqv1af')
  //     .then(tracker => {
  //       this.setState({
  //         loading: false,
  //         tracker
  //       })
  //     })

  //listening
    this.apiUnsub = trackerApi.get('X71KpGAD40LX5DZqv1af')
      .onSnapshot(tracker => {

        console.log(tracker.id)

        trackerApi.allEntries(tracker.id).onSnapshot(collection => {
          console.log(collection)
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
    //if listening
    this.apiUnsub();
  }

  render() {
    return <TrackerView {...this.state} />
  }
}

export default TrackerContainer