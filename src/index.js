import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import HomePage from "./home/HomePage";
import Details from "./details/Details";


ReactDOM.render(
    <Router>
        <div>
            <Route path={'/'}
                   exact
                   render={() => <HomePage/>}/>
            <Route path={'/details/:symbol'}
                   render={() => <Details/>}/>
        </div>
    </Router>,
    document.getElementById('root')
);

