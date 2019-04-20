import React from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css'
import TradingViewWidget from 'react-tradingview-widget';


//Figured out how to embed the TradingView widget from here,
//https://stackoverflow.com/questions/53845011/how-to-to-insert-tradingview-widget-into-react-js-which-is-in-script-tag-link-h

//Using the TradingViewWidget package, installed via NPM
// https://www.npmjs.com/package/react-tradingview-widget

export default class HomePage extends React.Component {

    constructor() {
        super();
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
            <div id={"t"}>
                <div id={"nav-bars"}>
                    <div id={"tickerBox"} ref={this.topTicker}/>
                    <nav className="navbar navbar-dark bg-dark justify-content-between">
                        <label className="navbar-brand" id={"websiteName"}>Creepo Investing | Member</label>
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
                <div className={"row flex-grow-1"} id={"mainContentContain"}>
                    <div className={"col-3"} id={"leftPanel"}>
                        <h3 id={"selectInstrument"}>Instrument / USD</h3>
                        <i className="fab fa-bitcoin" id={"bitcoin"}><label id={"forBitcoin"}>Bitcoin</label></i>
                        <i className="fab fa-ethereum" id={"bitcoin"}><label id={"forEthereum"}>Ethereum</label></i>
                        <i className="fab fa-monero" id={"bitcoin"}><label id={"forMonero"}>Monero</label></i>
                        <i className="fas fa-coins" id={"bitcoin"}><label id={"forRipple"}>Ripple</label></i>


                    </div>
                    <div className={"col-9"} id={"rightPanel"}>
                        <TradingViewWidget symbol="COINBASE:BTCUSD" autosize={"true"}
                                           theme={"dark"}
                                           hide_top_toolbar={"true"}
                                           toolbar_bg={"rgba(23, 32, 40, 1)"}
                                           news={["headlines"]}/>
                    </div>

                </div>

                <div id={"footer"}>

                    <label>
                        Copyright Creepo Investment Inc. 2019 - All Rights Reserved, Established 2019.
                    </label>
                    <p>About:
                        Welcome to Creepo Investment Inc, where we take care of all your most delicate financial needs.
                    </p>
                </div>
            </div>

        )

    }
}
