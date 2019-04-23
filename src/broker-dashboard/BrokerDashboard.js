import React, {Component} from 'react';
import './BrokerDashboard.css'
import UserService from "../services/UserService";
import InvestorService from "../services/InvestorService";

export default class BrokerDashboard extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.investorService = InvestorService.getInstance();
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
                investments: []
            })
        }
        this.investorService.findTradeByInvestor(event.target.value)
            .then(trades => {
                console.log(trades);
                this.setState({
                    client: trades.investor,
                    investments: trades
                })
            })
    };

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
                                    return (
                                        <tr id={"tableRows"}>
                                            <td>
                                                {investment.name} ({investment.symbol})
                                            </td>
                                            <td>
                                                {investment.shares}
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
                                                {investment.type}
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
