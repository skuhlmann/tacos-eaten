import React, { Component } from 'react';
import api from '../../services/api'
import TrackerList from './TrackerList'

class ListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    this.apiUnsub = api.trackers.all().onSnapshot(collection => {

      let trackers = collection.docs.map(doc => {
        let tracker = doc.data()
        tracker.id = doc.id
        return tracker
      })
      
      this.setState({ 
        loading: false,
        trackers: trackers 
      })
    })
  }

  componentWillUnmount() {
    this.apiUnsub();
  }

  render() {
    return <TrackerList {...this.state} />
  }
}

export default ListContainer