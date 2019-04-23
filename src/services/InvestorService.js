let INVEST_API_URL =
    'http://localhost:8080/api/';


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
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response =>
            response.json());
    };
}
