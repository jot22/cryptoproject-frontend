import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import UserService from "../services/UserService";

export default class ProfileSearch extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.searchTerm = props.match.params.criteria;
        this.state = {
            results: [],
            resultProfile: [],
            routeSearch: false,
            searchInput: props.match.params.criteria
        };
        this.search();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.criteria !== this.props.match.params.criteria) {
            this.search();
        }
    }

    searchInputChanged = (event) => {
        this.setState(
            {
                searchInput: event.target.value
            }
        );
    };

    search = () => {
        if (this.state.searchInput) {
            this.userService.findAllUsers().then(m => {
                this.setState({
                    results: m.filter(x => ((x.username === this.state.searchInput)
                        || (x.firstName === this.state.searchInput) ||
                        (x.lastName === this.state.search)))
                });
            })

        }
    };

    render() {
        if (this.state.routeSearch === true) {
            let url = '/search/' + this.state.searchInput;
            return <Redirect to={url}/>
        }

        return (
            <div id={"mainSearchContainer"}>
                <input placeholder={'Search'}
                       type={'search'}
                       value={this.state.searchInput}
                       onChange={this.searchInputChanged}/>
                <button id={"submitButton"}
                        className="btn btn-primary my-2 my-sm-0"
                        type="submit"
                        onClick={() => {
                            let url = '/profileSearch/' + this.state.searchInput;
                            this.props.history.push(url)
                        }}>
                    Search
                </button>
                <h1 id={"searchHeader"}>Search Results</h1>
                <ul className={'list-group'} id={"searchAll"}>
                    {
                        this.state.results.map((crypto, i) => {
                                return (
                                    <li id={"eachListItem"} className={'list-group-item py-0 list-group-item-action'}>
                                        <Link to={'/profile/' + crypto.username} id={"perCryptoResult"}>
                                            <h1>
                                                {i + 1}. {crypto.username}
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
