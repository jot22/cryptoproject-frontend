import React, {Component} from 'react';
import './DualExchange.css'
import CoinbaseService from "../services/CoinbaseService";
import CoinMarketService from "../services/CoinMarketService";

export default class DualExchange extends Component {
    constructor(props) {
        super(props);
        this.coinbase = CoinbaseService.getInstance();
        this.cmc = CoinMarketService.getInstance();
        this.state = {
            btcCB: [],
            ethCB: [],
            btCmc: {},
            ethCmc: {}
        }
    }

    componentDidMount() {
        this.coinbase.getBTCtoUSD().then(m => {
            this.setState({btcCB: m})
        });
        this.coinbase.getETHtoUSD().then(m => {
            this.setState({ethCB: m})
        });
        this.cmc.findCryptoBySymbol("BTC").then(m => {
            this.setState({btCmc: m.data}, () => console.log(this.state.btCmc))
        })

    }

    render() {

        return (
            <div id={"mainDualContainer"}>
                <h1 id={"dualHeader"}>
                    Exchanges Compared
                </h1>
                <div className={"row"}>
                    <div className={"col-6"} id={"cbCol"}>
                        <h1 id={"portHeader"}>
                            Coinbase
                        </h1>
                        <div id={"priceDivide"}>
                            <h4 id={"btcHeader"}>BTC</h4>
                            <h5>High Price:{this.state.btcCB.high}</h5>
                            <h5>Low Price:{this.state.btcCB.low}</h5>
                            <h5>Open Price:{this.state.btcCB.open}</h5>
                            <h5>Last Price:{this.state.btcCB.last}</h5>

                            <h4 id={"btcHeader"}>ETH</h4>
                            <h5>High Price:{this.state.ethCB.high}</h5>
                            <h5>Low Price:{this.state.ethCB.low}</h5>
                            <h5>Open Price:{this.state.ethCB.open}</h5>
                            <h5>Last Price:{this.state.ethCB.last}</h5>
                        </div>


                    </div>
                    <div className={"col-6"}>
                        <h1 id={"portHeader"}>
                            CoinMarketCap
                        </h1>

                            <h4 id={"btcHeader"}>BTC</h4>
                            <h5>High Price:{this.state.btcCB.high}</h5>
                            <h5>Low Price:{this.state.btcCB.low}</h5>
                            <h5>Open Price:{this.state.btcCB.open}</h5>
                            <h5>Last Price:{this.state.btcCB.last}</h5>

                            <h4 id={"btcHeader"}>ETH</h4>
                            <h5>High Price:{this.state.ethCB.high}</h5>
                            <h5>Low Price:{this.state.ethCB.low}</h5>
                            <h5>Open Price:{this.state.ethCB.open}</h5>
                            <h5>Last Price:{this.state.ethCB.last}</h5>

                    </div>
                </div>
            </div>
        )
    }
}
