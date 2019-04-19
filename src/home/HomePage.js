import React from 'react';
import './HomePage.css'
import TradingViewWidget from 'react-tradingview-widget';


//Figured out how to embed the TradingView widget from here,
//https://stackoverflow.com/questions/53845011/how-to-to-insert-tradingview-widget-into-react-js-which-is-in-script-tag-link-h

//Using the TradingViewWidget package, installed via NPM
// https://www.npmjs.com/package/react-tradingview-widget

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={"t"}>
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
