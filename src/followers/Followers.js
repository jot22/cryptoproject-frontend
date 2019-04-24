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
            following: [],
            firstNames: [],
            all: {},
            fName: []
        }
    }

    componentDidMount() {

        this.follorService.findFollowingByUserId();
        let userNames = [];

        this.userService.profile().then(response => {
            let id = response._id;
            this.follorService.findFollowingByUserId(id).then(follows => {
                this.setState({all: follows});
                //console.log("HIT:" + JSON.stringify(follows));
            }).then(() => {
                    this.state.all.following.map(user => {
                        this.userService.findUserById(user).then(out => {
                                userNames.push(out.username);
                            }
                        ).then(() =>
                            this.setState({fName: userNames})
                        )

                    })

                }
            )
        });



        let users = [];
        this.userService.profile().then(response => {
            this.follorService.findFollowingByUserId(response._id).then(newResponse => {
                users = newResponse.following;
                console.log(users);
                this.setState({
                    user: response,
                    following: users
                })
            })
        })
    }

    getListOfFirstNames() {
        let users = [];
        this.userService.profile().then(response => {
            this.follorService.findFollowingByUserId(response._id).then(newResponse => {
                console.log(newResponse.following);
                users = newResponse.following;
                newResponse.following.map(user =>
                    this.userService.findUserById(user).then(newestResponse => {

                    })
                );
            });
            this.setState({
                user: response
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
                            this.state.fName.map(user => {
                                // let i = this.state.following.indexOf(user)
                                // console.log(user);
                                // let firstName = '';
                                // return this.userService.findUserById(this.state.following[i]).then(userIdea =>
                                //     console.log(userIdea)
                                // );
                                console.log(user);
                                return (

                                    <tr id={"tableRows"}>
                                        {user}
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


}
