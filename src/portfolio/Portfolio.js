import React, {Component} from 'react';
import './Portfolio.css'
import UserService from "../services/UserService";
import InvestorService from "../services/InvestorService";

export default class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.investorService = InvestorService.getInstance();
        this.state = {
            user: {},
            investments: []
        }
    }

    componentDidMount() {
        console.log(this.state.investments)
        this.userService.profile().then(
            user => {
                this.investorService.findTradeByInvestor(user._id)
                    .then(trades => {
                        console.log(user)
                        console.log(trades)
                        this.setState({
                            user: user,
                            investments: trades
                        })
                    })
            }
        )
    }

    render() {
        return (
            <div id={"mainPortfolioContainer"}>
                <h1 id={"portHeader"}>
                    Portfolio
                </h1>
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
