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
            user: {
                clients: []
            },
            investments: []
        }
    }

    componentDidMount() {
        this.userService.profile().then(
            user => {
                this.setState({
                    user: user
                })
            }
        )
    }

    selectClient = event => {
        this.investorService.findTradeByInvestor(event.target.value)
            .then(trades => {
                console.log(trades)
                this.setState({
                    investments: trades
                })
            })
    }

    render() {
        return (
            <div id={"mainBrokerDashContainer"}>
                <h1 id={"brokerHeader"}>
                    Broker Dashboard
                </h1>
                <div className={"row"} id={"performanceBar"}>
                    <h4>Overall Performance: <span className="badge badge-secondary"> 45%</span></h4>

                    <div className="btn-group special" id={"addClientBox"}>
                        <select className={'form-control'}
                                onChange={this.selectClient}>
                            <option>
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
                            <th>Client Name</th>
                            <th>Total Invested</th>
                            <th>
                                <div>Performance</div>
                            </th>

                            <th>Available USD</th>
                            <th>Remove Client</th>
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
