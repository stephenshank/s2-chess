import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from 'axios';

import Home from "./home.jsx";
import Openings from "./openings.jsx";
import Engine from "./engine.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"


function App () {
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('/api')
      .catch(error => setError(true));
  });
  return (
    <BrowserRouter>
      <div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>{error ? "" : "S2 Chess"}</h3>
        </div>
        <ul className="list-unstyled components">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/openings">Openings</Link>
          </li>
          <li>
            <Link to="/engine">Engine</Link>
          </li>
        </ul>
      </nav>

      <div className="container-fluid" id="content">
        <Route exact path="/" component={Home} />
        <Route path="/openings" component={Openings} />
        <Route path="/engine" component={Engine} />
      </div>
    </div>
  </BrowserRouter>);
}

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement('div'))
)

