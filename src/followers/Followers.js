import React, {Component} from 'react';


export default class Followers extends Component {
    constructor(props) {
        super(props);
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

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


}
