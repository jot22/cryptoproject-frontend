import React from 'react';
import UserService from "../services/UserService";
import {Link} from "react-router-dom";
import ap from './ap.png'
import jt from './jt.jpg'
import jr from './jr.jpg'


//Figured out how to embed the TradingView widget from here,
//https://stackoverflow.com/questions/53845011/how-to-to-insert-tradingview-widget-into-react-js-which-is-in-script-tag-link-h

//Using the TradingViewWidget package, installed via NPM
// https://www.npmjs.com/package/react-tradingview-widget

export default class HomePage extends React.Component {


    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.state = {
            user: {},
            ticker: 'COINBASE:BTCUSD'
        }
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
                        <h6 id={"portfolioValue"}>Portfolio Value: $4500</h6>
                        <h6 id={"portfolioValue"}>Managed By: Tom</h6>
                        <h3 id={"selectInstrument"}>Main Pairs / USD</h3>
                        <h6 id={"portfolioValue"}>Select Graph Instrument</h6>
                        <select className={'form-control'} onChange={(m) => {
                            this.setState({ticker: m.target.value})
                        }}>
                            <option value={"COINBASE:BTCUSD"}>
                                Bitcoin
                            </option>
                            <option value={"COINBASE:ETHUSD"}>
                                Ethereum
                            </option>
                            <option value={"BITFINEX:XMRUSD"}>
                                Monero
                            </option>
                            <option value={"COINBASE:XRPUSD"}>
                                Ripple
                            </option>
                        </select>
                        <h3 id={"selectInstrumentBottom"}>View Dashboard</h3>
                        <Link to={'/followers'}>
                            <button type={'button'}
                                    id={"portfolioButton"}
                                    className={'btn btn-primary btn-block'}>
                                Portfolio
                            </button>
                        </Link>
                    </div>
                );
                buffer.push(
                    <div className={"col-9"} id={"rightPanel"}>
                        <div id={"newPanel"}>
                            <h1 id={"marketOver"}>Market Overview</h1>
                            <h6>Currencies: </h6>
                            <h6>Market Cap: </h6>
                            <h6>24 Hour Volume: </h6>
                            <h6>BTC Dominance: </h6>
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
                        <h6 id={"portfolioValue"}>Overall Performance: 25%</h6>
                        <h3 id={"selectInstrument"}>Main Pairs / USD</h3>
                        <h6 id={"portfolioValue"}>Select Graph Instrument</h6>
                        <select className={'form-control'} onChange={(m) => {
                            this.setState({ticker: m.target.value})
                        }}>
                            <option value={"COINBASE:BTCUSD"}>
                                Bitcoin
                            </option>
                            <option value={"COINBASE:ETHUSD"}>
                                Ethereum
                            </option>
                            <option value={"BITFINEX:XMRUSD"}>
                                Monero
                            </option>
                            <option value={"COINBASE:XRPUSD"}>
                                Ripple
                            </option>
                        </select>
                        <h3 id={"selectInstrumentBottom"}>View Dashboard</h3>
                        <Link to={'/brokerPortfolio'}>
                            <button type={'button'}
                                    id={"portfolioButton"}
                                    className={'btn btn-primary btn-block'}>
                                Portfolios
                            </button>
                        </Link>
                    </div>
                );
                buffer.push(
                    <div className={"col-9"} id={"rightPanel"}>
                        <div id={"newPanel"}>
                            <h1 id={"marketOver"}>Market Overview</h1>
                            <h6>Currencies: </h6>
                            <h6>Market Cap: </h6>
                            <h6>24 Hour Volume: </h6>
                            <h6>BTC Dominance: </h6>
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
