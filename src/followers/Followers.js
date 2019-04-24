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
            fName: [],
            lName: [],
            brokerName: []
        }
    }

    componentDidMount() {

        this.follorService.findFollowingByUserId();
        let userNames = [];
        let lastNames = [];
        let brokerName = [];
        this.userService.profile().then(response => {
            let id = response._id;
            this.follorService.findFollowingByUserId(id).then(follows => {
                this.setState({all: follows});
                //console.log("HIT:" + JSON.stringify(follows));
            }).then(() => {
                    this.state.all.following.map(user => {
                        this.userService.findUserById(user).then(out => {
                                userNames.push(out.firstName);
                                lastNames.push(out.lastName);
                                this.userService.findUserById(out.broker).then(broker =>
                                    brokerName.push(broker.firstName)
                                ).then(() =>
                                    this.setState({
                                        brokerName: brokerName
                                    })
                                )
                            }
                        ).then(() =>
                            this.setState({
                                fName: userNames,
                                lName: lastNames
                            })
                        )

                    })

                }
            )
        });
    }

    renderComp = () => {
        let buffer = [];
        this.state.fName.map(user => {

            buffer.push(
                <td id={"tableRows"}>
                    {user}
                </td>
            )
        });
        return buffer;

    };


    renderAll = () => {
        let buffer = [];
        for(let a =0; a< this.state.fName.length;a++){
            buffer.push(
                <tr>
                    <td id={"tableRows"}>
                        {this.state.fName[a]}
                    </td>
                    <td id={"tableRows"}>
                        {this.state.lName[a]}
                    </td>
                    <td id={"tableRows"}>
                        {this.state.brokerName[a]}
                    </td>
                </tr>
            )

        }
        return buffer;
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
                        {this.renderAll()}

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


}
