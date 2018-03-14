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
        this.setState({
          loading: false,
          tracker: tracker.data()
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