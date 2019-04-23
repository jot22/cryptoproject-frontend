import React, {Component} from 'react';
import './BrokerClientDashboard.css'
import UserService from "../services/UserService";
import InvestorService from "../services/InvestorService";
import BrokerService from "../services/BrokerService";

export default class BrokerClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.investorService = InvestorService.getInstance();
        this.brokerService = BrokerService.getInstance();
        this.state = {
            investments: []
        }
    }


    componentDidMount() {
        this.userService.profile().then(
            user => {
                this.investorService.findTradeByInvestor(user._id)
                    .then(trades => {
                        console.log(trades)
                        this.setState({
                            user: user,
                            investments: trades
                        })
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
                    Client: Tom
                </h1>
                <h3>At a Glance</h3>
                <table className="table table-dark">
                    <thead id="tableHead" className={"thead-dark"}>
                    <tr>
                        <th>Overall Performance: 20%</th>
                        <th>Invested Capital: 100</th>
                        <th>Current Market Value: 120</th>
                        <th>Available USD: 5000</th>
                    </tr>
                    </thead>
                </table>
                <div className={"row"} id={"performanceBar"}>
                    <h5>Overall Performance: <span className="badge badge-secondary"> 45%</span></h5>
                    <h5>Invested Capital: <span className="badge badge-secondary"> 45%</span></h5>
                    <h5>Current Market Value: <span className="badge badge-secondary"> 45%</span></h5>
                    <h5>Available USD: <span className="badge badge-secondary"> 45%</span></h5>
                </div>
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
                            <th>Gain / Loss</th>
                            <th>Amount To Sell</th>
                            <th>Sell Token</th>
                        </tr>
                        </thead>
                        <tbody id={"tableBodyPort"}>
                        {
                            this.state.investments.filter(trade => trade.sold === false)
                                .map(investment => {
                                        return (
                                            <tr id={"tableRows"}>
                                                <td>
                                                    {investment.crypto} ({investment.symbol})
                                                </td>
                                                <td>
                                                    {investment.tokens}
                                                </td>
                                                <td>
                                                    {investment.priceWhenBought}
                                                </td>
                                                <td>
                                                    {(investment.type === 'PROCESSED' &&
                                                        '$' + investment.dollar_change)
                                                    || '-'}
                                                </td>
                                                <td>
                                                    {(investment.type === 'PROCESSED' &&
                                                        investment.percent_change + '%')
                                                    || '-'}
                                                </td>
                                                <td>

                                                    <input placeholder="Amount To Sell"/>
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
