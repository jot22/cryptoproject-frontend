import React from 'react';
import '../home/HomePage.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import HomePage from "../home/HomePage";
import Login from "../login/Login";
import Register from "../registration/Register";
import Profile from "../profile/Profile";
import Api from "../api-content/ApiContent";
import Footer from "../footer/Footer";
import Details from '../details/Details';
import Portfolio from "../portfolio/Portfolio";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.topTicker = React.createRef();
        this.state = {
            searchInput: ""
        };
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        script.async = true;

        script.innerHTML = {
            "colorTheme": "dark",
            "isTransparent": true,
            "displayMode": "compact",
            "locale": "en",
            "symbols": [
                {
                    "title": "S&P 500",
                    "proName": "INDEX:SPX"
                },
                {
                    "title": "Shanghai Composite",
                    "proName": "INDEX:XLY0"
                },
                {
                    "title": "EUR/USD",
                    "proName": "FX_IDC:EURUSD"
                },
                {
                    "title": "BTC/USD",
                    "proName": "BITFINEX:BTCUSD"
                },
                {
                    "title": "ETH/USD",
                    "proName": "BITFINEX:ETHUSD"
                }
            ]
        };
        this.topTicker.current.appendChild(script);
    }

    searchInputChanged = (event) => {
        this.setState(
            {
                searchInput: event.target.value
            }
        );
    };

    render() {
        return (
            <Router>
                <div id={"t"}>
                    <div id={"nav-bars"}>
                        <div id={"tickerBox"} ref={this.topTicker}/>
                        <nav className="navbar navbar-dark bg-dark justify-content-between">
                            <label className="navbar-brand" id={"websiteName"}>
                                <Link to="/" className='disabled-link'>Creepo Investing | Member</Link>
                            </label>
                            <Link to={'/portfolio'}>
                                <button type={'button'}
                                        className={'btn btn-primary'}>
                                    Portfolio
                                </button>
                            </Link>
                            <label className="navbar-brand" id={"apiHooks"}>
                                <Link to="/api" className='disabled-link'>API Calls</Link>
                            </label>
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                       aria-label="Search"
                                       onChange={this.searchInputChanged}/>
                                <Link to={'/details/' + this.state.searchInput}>
                                    <button id={"submitButton"} className="btn btn-outline-success my-2 my-sm-0"
                                            type="submit">Search
                                    </button>
                                </Link>
                                <label id={"customerDetail"}>Smith, John</label>
                                <img id={"customerPicture"} src="https://dummyimage.com/38x38/000/fff" alt="..."/>
                            </form>
                        </nav>
                    </div>
                    <div>
                        <Route path="/"
                               exact
                               component={HomePage}/>
                        <Route path="/login" exact
                               render={() => <Login/>}/>
                        <Route path="/register" exact
                               render={() => <Register/>}/>
                        <Route path="/profile" exact
                               render={() => <Profile/>}/>
                        <Route path="/api" exact
                               render={() => <Api/>}/>
                        <Route path={'/details/:symbol'}
                               render={() => <Details/>}/>
                        <Route path={'/portfolio'}
                               render={() => <Portfolio/>}/>
                    </div>
                    <Footer/>
                </div>
            </Router>
        )
    }
}
