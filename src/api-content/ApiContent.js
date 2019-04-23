import React from 'react';
import '../home/HomePage.css';
import CryptoService from "../services/CryptoService";
import UserService from "../services/UserService";
import InvestorService from "../services/InvestorService";
import BrokerService from "../services/BrokerService";

export default class ApiContent extends React.Component {
    constructor(props) {
        super(props);
        this.cryptoService = CryptoService.getInstance();
        this.userService = UserService.getInstance();
        this.investorService = InvestorService.getInstance();
        this.brokerService = BrokerService.getInstance();
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

    //Update a Trade
    updateTrade() {
        let trade = {
            tokens: 2,
            priceWhenBought: 90000000,
            sold: true,
            status: "PENDING",
            crypto: "5cbcd1d72c35b45b3cdca6a6",
            investor: "5cbcc9c37892164cf88ae99b",
            broker: "5cbccaa47892164cf88ae99c"
        }
        let tradeId = "5cbcd1f62c35b45b3cdca6a7";
        this.brokerService.updateTrade(tradeId, trade).then(regi => {
            console.log("Update Trade");
            console.log(regi);
        });
    }

    //Find all trades by broker
    findTradeByBroker() {
        let brokerId = "5cbdc9b236e23d6b581fb43e";
        this.brokerService.findTradeByBroker(brokerId).then(trades => {
            console.log("Find By Broker");
            console.log(trades);
        })
    }

    //Finding all trades by Investor
    findTradeByInvestor() {
        let investorId = "5cbcc9c37892164cf88ae99b";
        this.investorService.findTradeByInvestor(investorId).then(trades => {
            console.log("Find By Investor");
            console.log(trades);
        })
    }

    //Making a Crypto Purchase Inquiry
    trade() {
        let trade = {
            tokens: 2,
            priceWhenBought: 300,
            sold: false,
            status: "PENDING",
        }
        let investorId = "5cbcc9c37892164cf88ae99b";
        let brokerId = "5cbccaa47892164cf88ae99c";
        let cryptoId = "5cbdc9b236e23d6b581fb43e";
        this.investorService.requestTrade(investorId, brokerId, cryptoId, trade).then(regi => {
            console.log("Buy");
            console.log(regi);
        });
    }

    render() {
        return(
            <div className={"White"}>
                Hello World!
                <button type="button" className="btn btn-success " id={"profile"}
                        onClick={() => this.updateTrade()}>Trades
                </button>
            </div>
        )
    }
}

