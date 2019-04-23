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
import Search from "../search/Search";
import BrokerDashboard from "../broker-dashboard/BrokerDashboard";
import BrokerClientDashboard from "../broker-client-dashboard/BrokerClientDashboard";
import UserService from "../services/UserService";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.topTicker = React.createRef();
        this.state = {
            user: {},
            searchInput: ""
        };
    }

    componentDidMount() {
        this.userService.profile().then(
            user => {
                this.setState({user: user});
            }
        );
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

    loadButtonsLoggedInNot = () => {
        let buffer = [];
        let loggedIn = true;
        if (loggedIn) {
            buffer.push(
                <Link to={'/profile'} id={"customerDetail"}>
                    Smith, John
                </Link>
            );
            buffer.push(
                <Link to={'/profile'}>
                    <button type={'button'}
                            id={"customerPicture"}
                            className={'btn btn-primary'}>
                        Profile
                    </button>
                </Link>
            );
            buffer.push(
                <div id={"buttonDivider"}/>
            );
            buffer.push(
                <Link to={'/portfolio'}>
                    <button type={'button'}
                            id={"portfolioButton"}
                            className={'btn btn-primary'}>
                        Portfolio
                    </button>
                </Link>
            )
        } else {
            buffer.push(
                <Link to={'/register'}>
                    <button type={'button'}
                            id={"customerPicture"}
                            className={'btn btn-primary'}>
                        Register
                    </button>
                </Link>
            );
            buffer.push(
                <div id={"buttonDivider"}/>
            );
            buffer.push(
                <Link to={'/login'}>
                    <button type={'button'}
                            id={"portfolioButton"}
                            className={'btn btn-primary'}>
                        Login
                    </button>
                </Link>
            )
        }
        return buffer;
    };

    properRole = () => {
        let role = 2;
        switch (role) {
            case 1:
                return "Guest";
            case 2:
                return "Member";
            case 3:
                return "Broker";
            default:
                return "Guest";
        }

    };

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
                            <label className="navbar-brand">
                                <Link to="/" id={"websiteName"}>Creepo Investing | {this.properRole()}</Link>
                            </label>

                            <label className="navbar-brand " id={"apiHooks"}>
                                <Link to="/api" className='disabled-link'>API Calls</Link>
                            </label>
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                       aria-label="Search"
                                       onChange={this.searchInputChanged}/>
                                <Link to={'/search/' + this.state.searchInput}>
                                    <button id={"submitButton"}
                                            className="btn btn-outline-success my-2 my-sm-0"
                                            type="submit">
                                        Search
                                    </button>
                                </Link>
                                {this.loadButtonsLoggedInNot()}
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
                               exact
                               component={Details}/>
                        <Route path={'/portfolio'}
                               render={() => <BrokerClientDashboard/>}/>
                        <Route path={'/search/:criteria'}
                               exact
                               component={Search}/>
                    </div>
                    <Footer/>
                </div>
            </Router>
        )
    }
}
