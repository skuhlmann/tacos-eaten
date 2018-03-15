import React, { Component } from 'react';
// import TrackerContainer from '../trackers/TrackerContainer'
import TrackerNew from '../trackers/TrackerNew'

class Home extends Component {

	render() {
		return (
			<div className="home__content">
					<TrackerNew />
			</div>
		)
	}
}

export default Home