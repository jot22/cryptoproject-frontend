import React, {Component} from 'react';

export default class Portfolio extends Component {
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
            <div>
                <h1>
                    Portfolio
                </h1>
                <table className="table-responsive">
                    <thead>
                    <tr>
                        <th>
                            Coin
                        </th>
                        <th>
                            Shares
                        </th>
                        <th>
                            Dollar Change
                        </th>
                        <th>
                            Percent Change
                        </th>
                        <th>
                            Processing Status
                        </th>
                        <th>
                            &nbsp;
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.investments.map(investment => {
                                return (
                                    <tr>
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
        )
    }
}