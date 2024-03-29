import React from 'react';
import UserService from "../services/UserService";
import {Link} from "react-router-dom";
import ap from './ap.png'
import jt from './jt.jpg'
import jr from './jr.jpg'
import CoinMarketService from "../services/CoinMarketService";


//Figured out how to embed the TradingView widget from here,
//https://stackoverflow.com/questions/53845011/how-to-to-insert-tradingview-widget-into-react-js-which-is-in-script-tag-link-h

//Using the TradingViewWidget package, installed via NPM
// https://www.npmjs.com/package/react-tradingview-widget

export default class HomePage extends React.Component {


    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.coinMarketService = CoinMarketService.getInstance();
        this.state = {
            broker: {firstName: "Not Managed"},
            user: {},
            ticker: 'COINBASE:BTCUSD',
            globalMetrics: {
                data: {
                    active_cryptocurrencies: 0,
                    btc_dominance: 0,
                    quote: {
                        USD: {
                            total_market_cap: 0,
                            total_volume_24h: 0
                        }
                    }
                }
            }
        }
    }

    componentDidMount() {
        this.userService.profile().then(user => {
            if (user.broker) {
                this.userService.findUserById(user.broker)
                    .then(broker =>
                        this.setState({broker: broker}))
            } else {
                this.setState({
                    broker: {
                        firstName: "Not Managed"
                    }
                })
            }
        })
        this.coinMarketService.getGlobalMetrics().then(metrics =>
            this.setState({globalMetrics: metrics}))
    }


    loadCorrectContent = () => {
        let role = '';
        if (this.props.user.type === 'BROKER') {
            role = 'broker';
        }
        if (this.props.user.type === 'INVESTOR') {
            role = 'member';
        }

        console.log("ROLE: " + role);

        let buffer = [];
        switch (role) {
            case "member":
                buffer.push(
                    <div className={"col-3"} id={"leftPanel"}>
                        <h3 id={"selectInstrument"}>At A Glance</h3>
                        <h6 id={"portfolioValue"}>Managed By: {this.state.broker.firstName}</h6>
                        <h3 id={"selectInstrumentBottom"}>View Dashboard</h3>
                        <Link to={'/portfolio'}>
                            <button type={'button'}
                                    id={"portfolioButton"}
                                    className={'btn btn-primary btn-block'}>
                                Portfolio
                            </button>
                        </Link>
                        <Link to={'/dualExchange'}>
                            <button type={'button'}
                                    id={"portfolioButtonBottom"}
                                    className={'btn btn-primary btn-block'}>
                                Dual Exchange
                            </button>
                        </Link>
                        <Link to={'/followers'}>
                            <button type={'button'}
                                    id={"portfolioButtonBottom"}
                                    className={'btn btn-primary btn-block'}>
                                Following
                            </button>
                        </Link>
                    </div>
                );
                buffer.push(
                    <div className={"col-9"} id={"rightPanel"}>
                        <div id={"newPanel"}>
                            <h1 id={"marketOver"}>Market Overview</h1>
                            <h6>Total Coins: {this.state.globalMetrics.data.active_cryptocurrencies}</h6>
                            <h6>Market Cap: ${this.state.globalMetrics.data.quote.USD.total_market_cap}</h6>
                            <h6>24 Hour Volume: ${this.state.globalMetrics.data.quote.USD.total_volume_24h}</h6>
                            <h6>BTC Dominance: {this.state.globalMetrics.data.btc_dominance}%</h6>

                        </div>
                    </div>
                );
                return buffer;
                break;
            case "broker":
                buffer.push(
                    <div className={"col-3"} id={"leftPanel"}>
                        <h3 id={"selectInstrument"}>At A Glance</h3>
                        <h6 id={"portfolioValue"}>Clients Managed: {this.props.user.clients.length}</h6>
                        <h3 id={"selectInstrumentBottom"}>View Dashboard</h3>
                        <Link to={'/brokerPortfolio'}>
                            <button type={'button'}
                                    id={"portfolioButton"}
                                    className={'btn btn-primary btn-block'}>
                                Portfolios
                            </button>
                        </Link>
                        <Link to={'/dualExchange'}>
                            <button type={'button'}
                                    id={"portfolioButtonBottom"}
                                    className={'btn btn-primary btn-block'}>
                                Dual Exchange
                            </button>
                        </Link>
                        <Link to={'/followers'}>
                            <button type={'button'}
                                    id={"portfolioButtonBottom"}
                                    className={'btn btn-primary btn-block'}>
                                Following
                            </button>
                        </Link>
                    </div>
                );
                buffer.push(
                    <div className={"col-9"} id={"rightPanel"}>
                        <div id={"newPanel"}>
                            <h1 id={"marketOver"}>Market Overview</h1>
                            <h6>Total Coins: {this.state.globalMetrics.data.active_cryptocurrencies}</h6>
                            <h6>Market Cap: ${this.state.globalMetrics.data.quote.USD.total_market_cap}</h6>
                            <h6>24 Hour Volume: ${this.state.globalMetrics.data.quote.USD.total_volume_24h}</h6>
                            <h6>BTC Dominance: {this.state.globalMetrics.data.btc_dominance}%</h6>
                        </div>
                    </div>
                );
                return buffer;
                break;
            default:
                buffer.push(
                    <div className={"col-12"} id={"rightPanel"}>
                        <div id={"guestBox"}>
                            <h4 id={"guestHeader"}>Welcome to Piggybank Investments</h4>
                            <p id={"guestBlurb"}>Hello. We are the Piggybank Investing Company.

                                We're a couple of young guys that are into cryptocurrencies and making web apps!

                                We hope you enjoy our virtual cryptocurrency trading application and get some good
                                practice
                                as an investor, or even a broker.

                                Thank you for your support!</p>
                            <h5>Founders</h5>
                            <div className={"row"} id={"pictureBox"}>
                                <div className="d-flex flex-column">
                                    <label>Atanas</label>
                                    <img src={ap} alt={"Atanas"}/>
                                </div>
                                <div className="d-flex flex-column">
                                    <label>JT</label>
                                    <img src={jt} alt={"JT"}/>
                                </div>
                                <div className="d-flex flex-column">
                                    <label>Jerry - He Runs</label>
                                    <img src={jr} alt={"Jerry - He Runs"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                );

        }
        return buffer;

    };

    render() {
        if (this.props.user === null) {
            return null;
        }
        return (
            <div className={"row flex-grow-1"} id={"mainContentContain"}>
                {this.loadCorrectContent()}
            </div>
        )

    }
}
