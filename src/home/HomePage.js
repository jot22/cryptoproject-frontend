import React from 'react';

import TradingViewWidget from 'react-tradingview-widget';


//Figured out how to embed the TradingView widget from here,
//https://stackoverflow.com/questions/53845011/how-to-to-insert-tradingview-widget-into-react-js-which-is-in-script-tag-link-h

//Using the TradingViewWidget package, installed via NPM
// https://www.npmjs.com/package/react-tradingview-widget

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: 'COINBASE:BTCUSD'
        }
    }

    loadChart(ticker) {
        this.setState({ticker: ticker})
    }

    loadCorrectContent = () => {
        let role = "member";
        let buffer = [];
        switch (role) {
            case "member":
                buffer.push(
                    <div className={"col-3"} id={"leftPanel"}>
                        <h3 id={"selectInstrument"}>Portfolio Value</h3>
                        <h4 id={"portfolioValue"}>$4500</h4>
                        <h3 id={"selectInstrument"}>Main Pairs / USD</h3>
                        <span onClick={() => this.loadChart("COINBASE:BTCUSD")}>
                        <i className="fab fa-bitcoin" id={"bitcoin"}><label
                            id={"forBitcoin"}>Bitcoin</label></i>
                    </span>
                        <span onClick={() => this.loadChart("COINBASE:ETHUSD")}>
                        <i className="fab fa-ethereum" id={"bitcoin"}><label id={"forEthereum"}>Ethereum</label></i>
                    </span>
                        <span onClick={() => this.loadChart("BITFINEX:XMRUSD")}>
                        <i className="fab fa-monero" id={"bitcoin"}><label id={"forMonero"}>Monero</label></i>
                    </span>
                        <span onClick={() => this.loadChart("COINBASE:XRPUSD")}>
                        <i className="fas fa-coins" id={"bitcoin"}><label id={"forRipple"}>Ripple</label></i>
                    </span>
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
                break;
            case "broker":
                buffer.push(

                );
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
        return (
            <div className={"row flex-grow-1"} id={"mainContentContain"}>
                {this.loadCorrectContent()}
            </div>
        )

    }
}
