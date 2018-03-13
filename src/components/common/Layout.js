import React, { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

export default ({ children }) => 
<Fragment>
	<Header />
	<main className="container-fluid">
		<div className="page-container">{children}</div>
	</main>
	<Footer />
</Fragment>