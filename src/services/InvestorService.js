// let INVEST_API_URL =
//     'http://localhost:8080/api/';
let INVEST_API_URL =
    'https://whispering-spire-33999.herokuapp.com/api/';


export default class InvestorService {
    static myInstance = null;

    static getInstance() {
        if (InvestorService.myInstance == null) {
            InvestorService.myInstance = new InvestorService();
        }
        return this.myInstance
    }

    requestTrade = (investorId, brokerId, cryptoId, trade) => {
        return fetch(INVEST_API_URL + "investor/" + investorId + "/broker/" + brokerId
            + "/crypto/" + cryptoId + "/trade", {
            credentials: 'include',
            method: 'post',
            body: JSON.stringify(trade),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());
    };

    findTradeByInvestor = (investorId) => {
        return fetch(INVEST_API_URL + "investor/" + investorId + "/trade", {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response =>
            response.json());
    };
}
