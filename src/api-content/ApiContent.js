import React from 'react';
import '../home/HomePage.css';
import CryptoService from "../services/CryptoService";
import UserService from "../services/UserService";
import InvestorService from "../services/InvestorService";

export default class ApiContent extends React.Component {
    constructor(props) {
        super(props);
        this.cryptoService = CryptoService.getInstance();
        this.userService = UserService.getInstance();
        this.investorService = InvestorService.getInstance();
        this.state = {
            crypto: [],
            user: {}
        }
    }

    componentDidMount() {
        let newNewUser = {
            username: "Yo",
            password: "Buck"
        };
        this.userService.login(newNewUser).then(registered => {
            console.log("REGISTERED");
            console.log(registered);
        });
    }

    trade() {
        let trade = {
            tokens: 2,
            priceWhenBought: 300,
            sold: false,
            status: "PENDING"
        }
        let investorId = "5cbcc9c37892164cf88ae99b";
        let brokerId = "5cbccaa47892164cf88ae99c";
        let cryptoId = "5cbdc9b236e23d6b581fb43e";
        this.investorService.requestTrade(investorId, brokerId, cryptoId, trade).then(regi => {
            console.log("Investment");
            console.log(regi);
        });
    }

    render() {
        return(
            <div className={"White"}>
                Hello World!
                <button type="button" className="btn btn-success " id={"profile"}
                        onClick={() => this.trade()}>Trade
                </button>
            </div>
        )
    }
}

