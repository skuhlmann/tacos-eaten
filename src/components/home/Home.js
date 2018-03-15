import React, { Component } from 'react';
import TrackerContainer from '../trackers/TrackerContainer'
import TrackerNew from '../trackers/TrackerNew'

class Home extends Component {

	render() {
		return (
			<div>
				<p>lorem ipsum</p>
				<TrackerContainer />
		
				<hr />
		
				<TrackerNew />
			</div>
		)
	}
}

export default Home