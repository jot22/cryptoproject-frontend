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
import Followers from "../followers/Followers";
import FollowersService from "../services/FollowersService";
import ReadOnlyProfile from "../read-only-profile/ReadOnlyProfile";
import ProfileSearch from "../profile-search/ProfileSearch";
import DualExchange from "../dual-exchange/DualExchange";
import FollowersParam from "../followersParam/FollowersParam";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.follorService = FollowersService.getInstance();
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
        if (this.state.user.type !== 'GUEST') {
            buffer.push(
                <Link to={'/profile'} id={"customerDetail"}>
                    {this.state.user.lastName}, {this.state.user.firstName}
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
            if (this.state.user.type === 'INVESTOR') {
                buffer.push(
                    <Link to={'/'}>
                        <button type={'button'}
                                id={"portfolioButton"}
                                className={'btn btn-primary'}
                                onClick={this.logout}>
                            Log Out
                        </button>
                    </Link>
                )
            } else {
                buffer.push(
                    <Link to={'/'}>
                        <button type={'button'}
                                id={"portfolioButton"}
                                className={'btn btn-primary'}
                                onClick={this.logout}>
                            Log Out
                        </button>
                    </Link>
                )
            }
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
        switch (this.state.user.type) {
            case "BROKER":
                return "Broker";
            case "INVESTOR":
                return "Investor";
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

    getProfile = () => {
        this.userService.profile().then(response => console.log(response))
    };

    getFollowers = () => {
        console.log(this.state.user._id);
        this.follorService.findFollowingByUserId(this.state.user._id).then(response => {
            console.log(response);
            this.follorService.deleteFromFollowing(this.state.user._id, response, '5cbe4e957957784bec7e56df', '5cbfae721371f637c8b73491')
                .then(newResponse => {
                    console.log(newResponse);
                })
        });
    };

    logout = () => {
        this.userService.logout().then(response =>
            this.setState({user: {type: 'GUEST'}}))
    };

    setUser = (user) => {
        this.setState({user: user})
    };

    render() {
        return (
            <Router>
                <div id={"t"}>
                    <div id={"nav-bars"}>
                        <div id={"tickerBox"} ref={this.topTicker}/>
                        <nav className="navbar navbar-dark bg-dark justify-content-between">
                            <label className="navbar-brand">
                                <Link to="/" id={"websiteName"}>Piggybank Investing | {this.properRole()}</Link>
                            </label>

                            <label className="navbar-brand " id={"apiHooks"}>
                                <Link to="/api" className='disabled-link'>API Calls</Link>
                            </label>
                            <button onClick={this.getFollowers}>
                                Profile
                            </button>
                            <form className="form-inline">
                                <Link to={'/profileSearch'}>
                                    <button id={"submitButton"}
                                            className="btn btn-outline-success my-2 my-sm-0"
                                            type="submit">
                                        Profile Search
                                    </button>
                                </Link>
                                <Link to={'/search'}>
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
                               render={() => <HomePage
                                   user={this.state.user}/>}/>
                        <Route path="/login" exact
                               render={() => <Login
                                   setUser={this.setUser}/>}/>
                        <Route path="/register" exact
                               render={() => <Register
                                   setUser={this.setUser}/>}/>
                        <Route path="/profile" exact
                               render={() => <Profile/>}/>
                        <Route path='/profile/:id'
                               exact
                               component={ReadOnlyProfile}/>
                        <Route path="/api" exact
                               render={() => <Api/>}/>
                        <Route path={'/details/:symbol'}
                               exact
                               component={Details}/>
                        <Route path={'/followers'}
                               exact
                               component={Followers}/>
                        <Route path={'/portfolio'}
                               render={() => <BrokerClientDashboard/>}/>
                        <Route path={'/brokerPortfolio'}
                               render={() => <BrokerDashboard/>}/>
                        <Route path={'/search/'} exact
                               component={Search}/>
                        <Route path={'/search/:criteria'}
                               component={Search}/>
                        <Route path={'/profileSearch/'} exact
                               component={ProfileSearch}/>
                        <Route path={'/profileSearch/:criteria'} exact
                               component={ProfileSearch}/>
                        <Route path={'/followers/:name'} exact
                               component={FollowersParam}/>
                        <Route path={'/dualExchange'} exact
                               component={DualExchange}/>

                    </div>
                    <Footer/>
                </div>
            </Router>
        )
    }
}
