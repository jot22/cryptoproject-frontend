import React from 'react';
import './Details.css';
import CoinMarketService from "../services/CoinMarketService";

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.coinMarketService = CoinMarketService.getInstance();
        this.symbol = props.match.params.symbol;
        this.state = {
            crypto: {
                data: {}
            }
        };
        this.state.crypto.data[this.symbol] = {
            name: null,
            symbol: null,
            quote: {
                USD: {
                    price: null,
                    volume_24h: null,
                    percent_change_24h: null,
                    market_cap: null
                }
            }
        }
    }

    componentDidMount() {
        this.coinMarketService.findCryptoBySymbol(this.symbol)
            .then(crypto => {
                this.setState({
                    crypto: crypto
                })
            });
    }

    render() {
        return (
            <div id={"mainDetailContainer"}>
                <h1 id={"detailHeader"}>Details</h1>
                <div className="card" id={"cardContain"}>
                    <div className="card-header" id={"cardHeader"}>
                        <h1>{this.state.crypto.data[this.symbol].name}</h1>
                    </div>
                    <div className="card-body">
                        <h5>Symbol: {this.state.crypto.data[this.symbol].symbol}</h5>
                        <h5>Price: {this.state.crypto.data[this.symbol].quote.USD.price}</h5>
                        <h5>Market Cap: {this.state.crypto.data[this.symbol].quote.USD.market_cap}</h5>
                        <h5>Volume: {this.state.crypto.data[this.symbol].quote.USD.volume_24h}</h5>
                        <h5>24 Hour Change: {this.state.crypto.data[this.symbol].quote.USD.percent_change_24h}%
                        </h5>
                    </div>
                </div>
            </div>
        );
    }
}
