import React, {Component} from 'react';
import './BrokerClientDashboard.css'
import UserService from "../services/UserService";
import InvestorService from "../services/InvestorService";
import BrokerService from "../services/BrokerService";
import CoinMarketService from "../services/CoinMarketService";

export default class BrokerClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.investorService = InvestorService.getInstance();
        this.brokerService = BrokerService.getInstance();
        this.coinMarketService = CoinMarketService.getInstance();
        this.state = {
            investments: []
        }
    }


    componentDidMount() {
        let temp = [];
        let temp2 = [];
        this.userService.profile().then(
            user => {
                this.investorService.findTradeByInvestor(user._id)
                    .then(trades => {
                        console.log(trades)
                        trades.forEach(trade =>
                            this.coinMarketService.findCryptoById(trade.crypto)
                                .then(crypto => {
                                    temp[trades.indexOf(trade)] = crypto;
                                    temp2[trades.indexOf(trade)] = trade;
                                    this.setState({
                                        user: user,
                                        investments: temp2,
                                        cryptos: temp
                                    })
                                    console.log(temp)
                                }))
                    })
            }
        )
    }

    findAllTrades = () => {
        this.investorService.findTradeByInvestor(this.state.user._id)
            .then(trades =>
                this.setState(
                    {
                        investments: trades
                    }
                ))
    };

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
                    Investor Dashboard
                </h1>
                <h3>At a Glance</h3>

                <div id="mainTable" className="table-responsive table-hover">
                    <table className="table">
                        <thead id="tableHead">
                        <tr>
                            <th>Coin</th>
                            <th>Shares</th>
                            <th>Buy Price $</th>
                            <th>
                                <div>Current Value $</div>
                            </th>
                            <th>Gain / Loss $</th>
                            <th>Sell Token</th>
                        </tr>
                        </thead>
                        <tbody id={"tableBodyPort"}>
                        {
                            this.state.investments.filter(trade => trade.sold === false)
                                .map(investment => {
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
                                                    {investment.priceWhenBought}
                                                </td>
                                                <td>
                                                    {(investment.status === 'PROCESSED' &&
                                                        Math.round(this.state.cryptos[i].data[investment.crypto].quote.USD.price))
                                                    || '-'}
                                                </td>
                                                <td>
                                                    {(investment.status === 'PROCESSED' &&
                                                        (investment.tokens *
                                                            (Math.round(this.state.cryptos[i].data[investment.crypto].quote.USD.price) - investment.priceWhenBought)))
                                                    || '-'}
                                                </td>
                                                <td>
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
