import React, {Component} from 'react';
import UserService from "../services/UserService";
import FollowersService from "../services/FollowersService";


export default class Followers extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.follorService = FollowersService.getInstance();
        this.state = {
            user: {},
            following: []
        }
    }

    componentDidMount() {
        let users = [];
        this.userService.profile().then(response => {
            this.follorService.findFollowingByUserId(response._id).then(newResponse => {
                newResponse.following.map(user => {
                        this.userService.findUserById(user).then(newestResponse => {
                            users.push(newestResponse);
                        })
                    }
                )
                console.log(users);
                this.setState({
                    user: response,
                    following: users
                })
            })
        })
    }

    render() {
        return (
            <div id={"mainBrokerDashContainer"}>
                <h1 id={"followerHeader"}>
                    Client Name - Followers
                </h1>

                <div id="mainTable" className="table-responsive table-hover">
                    <table className="table">
                        <thead id="tableHead">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Broker</th>
                        </tr>
                        </thead>
                        <tbody id={"tableBodyPort"}>
                        {
                            console.log(this.state.following)
                            // this.state.following.map(user => {
                            //     console.log(user);
                            //     return (
                            //         <tr id={"tableRows"}>
                            //             {user.firstName}
                            //         </tr>
                            //         )
                            // })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


}
