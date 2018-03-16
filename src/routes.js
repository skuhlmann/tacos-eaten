import React from 'react';
import { Switch, Route } from 'react-router';
import Home from './components/home/Home'
import TrackerContainer from './components/trackers/TrackerContainer'
import ListContainer from './components/trackers/ListContainer'
import NotFound from './components/common/NotFound'


const Routes = () => (
	<Switch>
		<Route path='/' exact component={Home} />
		<Route path='/tracker/:id' exact component={TrackerContainer} />
		{/* <Route path='/trackers' exact component={ListContainer} /> */}
		<Route path='/trackers' exact component={() => (<ListContainer model='trackers' />)} />

		{/* ELSE */}
		<Route path='*' exact component={NotFound} />
	</Switch>
)

export default Routes;