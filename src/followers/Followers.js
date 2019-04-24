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
            ids: [],
            userId: '',
            brokerName: []
        }
    }

    componentDidMount() {
        this.renderComp();
    }

    renderComp = () => {
        this.follorService.findFollowingByUserId();
        let userNames = [];
        let lastNames = [];
        let brokerName = [];
        let ids = [];
        this.userService.profile().then(response => {
            let id = response._id;
            this.follorService.findFollowingByUserId(id).then(follows => {
                this.setState({
                    all: follows,
                    userId: id
                });
                //console.log("HIT:" + JSON.stringify(follows));
            }).then(() => {
                    if (this.state.all) {
                        this.state.all.following.map(user => {
                            this.userService.findUserById(user).then(out => {
                                    userNames.push(out.firstName);
                                    lastNames.push(out.lastName);
                                    ids.push(user);
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
                                    ids: ids,
                                    lName: lastNames
                                })
                            )

                        })
                    }
                }
            )
        });

    };

    deleteFollowing = (num) => {
        console.log(this.state.all);
        console.log(this.state.ids[num]);
        console.log(this.state.userId)
        this.follorService.deleteFromFollowing(this.state.userId, this.state.all,
            this.state.ids[num], this.state.all._id).then(response => {
                this.renderComp();
                console.log(response)
        });

    }

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
                    <td id={"tableRows"}>
                        <button className={"btn-danger"} onClick={() => this.deleteFollowing(a)}>Delete</button>
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
                            <th>Remove Following</th>
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
