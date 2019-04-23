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

            <div id={"mainPortfolioContainer"}>
                <h1 id={"portHeader"}>
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
                        <button type="button" className="btn btn-success">Primary</button>

                    </div>
                </div>
                <div id="mainTable" className="table-responsive table-hover">
                    <table className="table">
                        <thead id="tableHead">
                        <tr>
                            <th>Coin</th>
                            <th>
                                <div className="d-none d-md-block">Shares <i className="fa fa-caret-down"
                                                                             aria-hidden="true"/>
                                </div>
                            </th>
                            <th>
                                <div className="d-none d-md-block">Dollar</div>
                            </th>
                            <th>Change Percent</th>
                            <th>Processing Status</th>
                            <th>Button</th>
                            <th>Total</th>
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
                                            <td>
                                                {
                                                    (investment.type === 'PROCESSED' &&
                                                        <button type={'button'}
                                                                className={'btn btn-danger'}>
                                                            Sell
                                                        </button>)
                                                    ||
                                                    <button type={'button'}
                                                            className={'btn btn-danger'}>
                                                        Cancel
                                                    </button>
                                                }
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
