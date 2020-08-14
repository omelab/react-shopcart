import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from './Home';
import About from './About';
import Listing from './Listing';
import Auth from './Auth';
import ProtectedRoute from './ProtectedRoute';

class Nav extends Component {
    render() {
        return (
            <Router>
                <Link to="home"> Home </Link>
                <Link to="about"> About </Link>
                <Link to="/listing"> Listing </Link>
                <Link to="/"> Login </Link>
                <a href="/google.com"> External Link</a> 
                <Switch>
                <Route path="/home">
                    <ProtectedRoute component={Home} />
                </Route>
                <Route path="/about">
                    <ProtectedRoute component={About} />
                </Route>
                <Route path="/listing">
                    <ProtectedRoute component={Listing} />
                </Route>
                <Route path="/">
                    <Auth />
                </Route>
                </Switch> 
            </Router> 
        );
    }
}

export default Nav;

