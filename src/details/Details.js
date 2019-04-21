import React from 'react';
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
            <ul className={'list-group'}>
                <li className={'list-group-item'}>
                    <div className={'form-group row'}>
                        <h1>
                            {this.state.crypto.data[this.symbol].name}
                        </h1>
                        <h2>
                            ({this.state.crypto.data[this.symbol].symbol})
                        </h2>
                    </div>
                    <div className={'form-group row'}>
                        <h2>
                            Price:
                        </h2>
                        <h3>
                            {this.state.crypto.data[this.symbol].quote.USD.price}
                        </h3>
                    </div>
                    <div className={'form-group row'}>
                        <h2>
                            Volume:
                        </h2>
                        <h3>
                            {this.state.crypto.data[this.symbol].quote.USD.volume_24h}
                        </h3>
                    </div>
                    <div className={'form-group row'}>
                        <h2>
                            % Change:
                        </h2>
                        <h3>
                            {this.state.crypto.data[this.symbol].quote.USD.percent_change_24h}
                        </h3>
                    </div>
                    <div className={'form-group row'}>
                        <h2>
                            Market Cap:
                        </h2>
                        <h3>
                            {this.state.crypto.data[this.symbol].quote.USD.market_cap}
                        </h3>
                    </div>
                </li>
            </ul>
        )
    }
}