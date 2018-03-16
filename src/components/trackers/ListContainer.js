import React, { Component, Fragment } from 'react';
import api from '../../services/api'
import TrackerList from './TrackerList'

class ListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    this.apiUnsub = api[this.props.model].all().onSnapshot(collection => {

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

  renderList() {
    if (this.props.model === 'trackers') {
      return <TrackerList {...this.state} />
    } else if (this.props.model === 'entries') {
      // return <EntriesList {...this.state} />
    }
  }

  render() {
    const listType = this.renderList()

    return (
      <Fragment>
        {listType}
      </Fragment>
    )
  }
}

export default ListContainer