import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Search.css'
import CoinMarketService from "../services/CoinMarketService";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.coinMarketService = CoinMarketService.getInstance();
        this.state = {
            results: [],
            searchInput: ""
        }
    }

    // componentDidMount() {
    //     console.log(this.props.match.params.criteria)
    //     // this.coinMarketService.findAllCrypto().then(results => {
    //     //         console.log(results)
    //     //         this.setState({
    //     //             results: results.data.filter(coin =>
    //     //                 ((coin.name.toLowerCase()).includes(this.state.searchInput) ||
    //     //                     this.state.searchInput.includes((coin.name.toLowerCase())) ||
    //     //                     coin.symbol.toLowerCase() === this.state.searchInput))
    //     //         })
    //     //     }
    //     // )
    // }

    searchInputChanged = (event) => {
        this.setState(
            {
                searchInput: event.target.value
            }
        );
    };

    search = () => {
        console.log(this.state.searchInput)
        this.coinMarketService.findAllCrypto().then(results => {
                console.log(results)
                this.setState({
                    results: results.data.filter(coin =>
                        ((coin.name.toLowerCase()).includes(this.state.searchInput) ||
                            this.state.searchInput.includes((coin.name.toLowerCase())) ||
                            coin.symbol.toLowerCase() === this.state.searchInput))
                })
            }
        )
    }

    render() {
        return (
            <div id={"mainSearchContainer"}>
                <input placeholder={'Search'}
                       type={'search'}
                       value={this.state.searchInput}
                       onChange={this.searchInputChanged}/>
                <button id={"submitButton"}
                        className="btn btn-primary my-2 my-sm-0"
                        type="submit"
                        onClick={() => this.search()}>
                    Search
                </button>
                <h1 id={"searchHeader"}>Search Results</h1>
                <ul className={'list-group'} id={"searchAll"}>
                    {
                        this.state.results.map((crypto, i) => {
                                return (
                                    <li id={"eachListItem"} className={'list-group-item py-0 list-group-item-action'}>
                                        <Link to={'/details/' + crypto.symbol} id={"perCryptoResult"}>
                                            <h1>
                                                {i + 1}. {crypto.name}
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
