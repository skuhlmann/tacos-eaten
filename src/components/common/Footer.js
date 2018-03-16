import React from 'react';
import { Link } from "react-router-dom";

export default () => 
  <footer className="footer">
    <div className="container">
      <span className="text-muted">
        <i className="fas fa-certificate"></i>
        <i className="fas fa-certificate"></i>
        <i className="fas fa-certificate"></i>
        <i className="fas fa-certificate"></i>
        <Link to="/trackers">My Trackers</Link>
      </span>
    </div>
  </footer>