import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Search.css'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.searchCriteria = props.match.params.criteria;
        this.state = {
            results: [
                {name: 'BTC'}, {name: 'TFR'}

            ]
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id={"mainSearchContainer"}>
                <h1 id={"searchHeader"}>Search Results</h1>
                <ul className={'list-group'} id={"searchAll"}>
                    {
                        this.state.results.map((crypto,i) => {
                                return (
                                    <li id={"eachListItem"} className={'list-group-item py-0 list-group-item-action'}>
                                        <Link to={'/details/' + crypto.name} id={"perCryptoResult"}>
                                            <h1 >
                                                {i+1}. {crypto.name}
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
