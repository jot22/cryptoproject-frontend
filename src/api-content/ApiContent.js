import React from 'react';
import '../home/HomePage.css';
import CryptoService from "../services/CryptoService";

export default class ApiContent extends React.Component {
    constructor(props) {
        super(props);
        this.cryptoService = CryptoService.getInstance();
        this.state = {
            crypto: []
        }

    }

    componentDidMount() {
        this.cryptoService.findAllCrypto().then(crypto => {
            this.setState({
                crypto: crypto
            });
            console.log(crypto);
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

