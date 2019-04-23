import React, {Component} from 'react';
import './BrokerClientDashboard.css'

export default class BrokerClientDashboard extends Component {
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

                                                <input placeholder="Amount To Sell"/>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-danger">Sell</button>

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
