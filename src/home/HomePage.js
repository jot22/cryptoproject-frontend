import React from 'react';

import TradingViewWidget from 'react-tradingview-widget';
import UserService from "../services/UserService";
import {Link} from "react-router-dom";
import TradingViewGraph from '../trading-view/TradingViewGraph'


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

        console.log("ROLE: "+role);

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
                        <TradingViewGraph/>
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
                        <TradingViewWidget symbol={this.state.ticker}
                                           autosize={"true"}
                                           theme={"dark"}
                                           hide_top_toolbar={"true"}
                                           toolbar_bg={"rgba(23, 32, 40, 1)"}
                                           news={["headlines"]}/>
                    </div>
                );
                return buffer;
                break;
            default:
                buffer.push(
                    <div className={"col-12"} id={"rightPanel"}>
                        <TradingViewWidget symbol={this.state.ticker}
                                           autosize={"true"}
                                           theme={"dark"}
                                           hide_top_toolbar={"true"}
                                           toolbar_bg={"rgba(23, 32, 40, 1)"}
                                           news={["headlines"]}/>
                    </div>
                );

        }
        return buffer;

    };

    render() {
        if(this.props.user === null){
            return null;
        }
        return (
            <div className={"row flex-grow-1"} id={"mainContentContain"}>
                {this.loadCorrectContent()}
            </div>
        )

    }
}
