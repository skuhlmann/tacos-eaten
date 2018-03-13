import React from 'react';
import { Switch, Route } from 'react-router';
import Home from './components/home/Home'


const Routes = () => (
	<Switch>
		<Route path='/' exact component={Home} />

		{/* ELSE */}
		{/* <Route path='*' exact component={NotFound} /> */}
	</Switch>
)

export default Routes;