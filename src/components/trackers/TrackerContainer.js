import React, { Component } from 'react';
import trackerApi from '../../services/trackerApi'
import TrackerView from './TrackerView'

class TrackerContainer extends Component {
  state = { loading: true }

  componentDidMount() {
    trackerApi.find('X71KpGAD40LX5DZqv1af')
      .then(tracker => {
        this.setState({
          loading: false,
          tracker
        })
      })
  }

  render() {
    return <TrackerView {...this.state} />
  }
}

export default TrackerContainer