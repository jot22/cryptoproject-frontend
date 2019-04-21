import React from 'react';
import './Details.css';
import CoinMarketService from "../services/CoinMarketService";

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.coinMarketService = CoinMarketService.getInstance();
        this.symbol = props.match.params.symbol;
        this.state = {
            shares: '',
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

    sharesInputChanged = (event) => {
        this.setState(
            {
                shares: event.target.value
            }
        );
    };

    investAsInvestor = () => {
        console.log(this.state.shares)
    };

    displayCorrectBox = () => {
        let buffer = [];
        let role = "BROKER";
        switch (role) {
            case "INVESTOR":
                buffer.push(
                    <div className="btn-group" role="group" id={"investorBox"}>
                        <input type="text" className="form-control" placeholder="# of Shares"/>
                        <button type="button" className="btn btn-success btn-block">Request Shares</button>
                    </div>
                );
                break;
            case "BROKER":
                buffer.push(
                    <div className="btn-group" role="group">
                        <input type="text" className="form-control" placeholder="# of Shares"/>
                        <select className={'form-control'}>
                            <option>
                                Client List
                            </option>
                        </select>
                        <button type="button" className="btn btn-success btn-block">Invest</button>
                    </div>
                );
                break;
            default:
                return buffer;

        }
        return buffer;


    };

    render() {
        return (
            <div id={"mainDetailContainer"}>
                <h1 id={"detailHeader"}>Details</h1>
                <div className="card" id={"cardContain"}>
                    <div className="card-header" id={"cardHeader"}>
                        <h1>BTC</h1>
                        {this.displayCorrectBox()}
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

//
