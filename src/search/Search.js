import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.searchCriteria = props.match.params.criteria;
        this.state = {
            results: [
                {name: 'BTC'}
            ]
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <ul className={'list-group'}>
                    {
                        this.state.results.map((crypto) => {
                                return (
                                    <li className={'list-group-item'}>
                                        <Link to={'/details/' + crypto.name}>
                                            <h1>
                                                {crypto.name}
                                            </h1>
                                        </Link>
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
            </div>
        )
    }
}