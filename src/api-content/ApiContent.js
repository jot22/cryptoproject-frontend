import React from 'react';
import '../home/HomePage.css';
import CryptoService from "../services/CryptoService";
import UserService from "../services/UserService";

export default class ApiContent extends React.Component {
    constructor(props) {
        super(props);
        this.cryptoService = CryptoService.getInstance();
        this.userService = UserService.getInstance();
        this.state = {
            crypto: [],
            user: {}
        }

    }

    componentDidMount() {
        let newUser = {username: this.state.username, password: this.state.password};
        this.userService.register(newUser).then(newUser => {
            this.setState({
                crypto: crypto
            });
            console.log(newUser);
        })
    }

    render() {
        return(
            <div className={"White"}>
                Hello World!
            </div>
        )
    }
}

