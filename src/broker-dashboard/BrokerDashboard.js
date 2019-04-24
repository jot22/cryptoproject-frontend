import React, {Component} from 'react';
import './BrokerDashboard.css'
import UserService from "../services/UserService";
import InvestorService from "../services/InvestorService";
import CoinMarketService from "../services/CoinMarketService";
import BrokerService from "../services/BrokerService";

export default class BrokerDashboard extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.investorService = InvestorService.getInstance();
        this.coinMarketService = CoinMarketService.getInstance();
        this.brokerService = BrokerService.getInstance();
        this.state = {
            client: undefined,
            user: {
                clients: []
            },
            investments: []
        }
    }

    componentDidMount() {
        this.userService.profile().then(
            user => {
                this.userService.findUserById(user._id).then(
                    user => this.setState({user: user})
                )
            }
        )
    }

    selectClient = event => {
        if (event.target.value === undefined) {
            this.setState({
                client: event.target.value,
                investments: [],
                cryptos: []
            })
        }
        let temp = [];
        let temp2 = [];
        this.investorService.findTradeByInvestor(event.target.value)
            .then(trades => {
                console.log(trades)
                trades.forEach(trade =>
                    this.coinMarketService.findCryptoById(trade.crypto)
                        .then(crypto => {
                            console.log(crypto)
                            temp[trades.indexOf(trade)] = crypto;
                            temp2[trades.indexOf(trade)] = trade;
                            this.setState({
                                client: trades.investor,
                                investments: temp2,
                                cryptos: temp
                            })
                        }))
            })
    };

    findAllTrades = () => {
        this.investorService.findTradeByInvestor(this.state.client)
            .then(trades =>
                this.setState(
                    {
                        investments: trades
                    }
                ))
    };

    buyTrade = (trade, pwb) => {
        trade.status = 'PROCESSED'
        trade.priceWhenBought = pwb
        this.brokerService.updateTrade(trade._id, trade)
            .then(response => {
                this.findAllTrades()
            });
    }

    sellTrade = (trade) => {
        trade.sold = true;
        this.brokerService.updateTrade(trade._id, trade)
            .then(response => {
                this.findAllTrades()
            });
    }

    cancelTrade = (trade) => {
        this.brokerService.deleteTrade(trade._id, trade).then(
            response => this.findAllTrades()
        )
    }

    render() {
        return (
            <div id={"mainBrokerDashContainer"}>
                <h1 id={"brokerHeader"}>
                    Broker Dashboard
                </h1>
                <div className={"row"} id={"performanceBar"}>

                    <div className="btn-group special" id={"addClientBox"}>
                        <label id={"selectLabel"} htmlFor="selectClientSelect">Select Client</label>
                        <select className={'form-control'}
                                id="selectClientSelect"
                                value={this.state.client_id}
                                onChange={this.selectClient}>
                            <option value={undefined}>
                                Select a Client
                            </option>
                            {
                                this.state.user.clients.map(client => {
                                        return (
                                            <option value={client._id}>
                                                {client.firstName} {client.lastName}
                                            </option>
                                        )
                                    }
                                )
                            }
                        </select>
                    </div>
                </div>
                <div id="mainTable" className="table-responsive table-hover">
                    <table className="table">
                        <thead id="tableHead">
                        <tr>
                            <th>Coin Name</th>
                            <th>Tokens</th>
                            <th>Buy Price $</th>

                            <th>Current Value $</th>
                            <th>Gain / Loss</th>
                            <th>Amount To Sell</th>
                            <th>Sell</th>
                        </tr>
                        </thead>
                        <tbody id={"tableBodyPort"}>
                        {
                            this.state.investments.map(investment => {
                                    let i = this.state.investments.indexOf(investment)
                                    return (
                                        <tr id={"tableRows"}>
                                            <td>
                                                {this.state.cryptos[i].data[investment.crypto].name} ({this.state.cryptos[i].data[investment.crypto].symbol})
                                            </td>
                                            <td>
                                                {investment.tokens}
                                            </td>
                                            <td>
                                                {(investment.type === 'PROCESSED' &&
                                                    '$' + investment.priceWhenBought)
                                                || '-'}
                                            </td>
                                            <td>
                                                {(investment.type === 'PROCESSED' &&
                                                    '$' + Math.round(this.state.cryptos[i].data[investment.crypto].quote.USD.price))
                                                || '-'}
                                            </td>
                                            <td>
                                                {(investment.type === 'PROCESSED' &&
                                                    '$' + (investment.tokens *
                                                        (Math.round(this.state.cryptos[i].data[investment.crypto].quote.USD.price) - investment.priceWhenBought)))
                                                || '-'}
                                            </td>
                                            <td>
                                            </td>
                                            <td>
                                                <button type="button"
                                                        className={"btn btn-success " +
                                                        ((investment.status === 'PROCESSED') ? 'd-none' : "")}
                                                        onClick={() => this.buyTrade(investment,
                                                            Math.round(this.state.cryptos[i].data[investment.crypto].quote.USD.price))}>
                                                    Buy
                                                </button>
                                                <button type="button"
                                                        className={"btn btn-danger " +
                                                        ((investment.status === 'PROCESSED') ? 'd-none' : "")}
                                                        onClick={() => this.cancelTrade(investment)}>
                                                    Cancel
                                                </button>
                                                <button type="button"
                                                        className={"btn btn-danger " +
                                                        ((investment.status === 'PENDING') ? 'd-none' : "")}
                                                        onClick={() => this.sellTrade(investment)}>
                                                    Sell
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
