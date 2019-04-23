import React, {Component} from 'react';
import './BrokerDashboard.css'

export default class BrokerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            investments: [
                {
                    name: 'Bitcoin',
                    symbol: 'BTC',
                    shares: 10,
                    type: 'PROCESSED',
                    dollar_change: 50.00,
                    percent_change: 1.20
                },
                {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    shares: 5,
                    type: 'PENDING'
                }
            ]
        }
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
                        <select className={'form-control'}>
                            <option>
                                Client List
                            </option>
                        </select>
                        <button type="button" className="btn btn-success" id={"addClientButton"}>Add Client</button>
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
