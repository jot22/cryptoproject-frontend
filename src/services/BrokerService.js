// let INVEST_API_URL =
//     'http://localhost:8080/api/';
let INVEST_API_URL =
    'https://whispering-spire-33999.herokuapp.com/api/';

export default class BrokerService {
    static myInstance = null;

    static getInstance() {
        if (BrokerService.myInstance == null) {
            BrokerService.myInstance = new BrokerService();
        }
        return this.myInstance
    }

    findTradeByBroker = (brokerId) => {
        return fetch(INVEST_API_URL + "broker/" + brokerId + "/trade", {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response =>
            response.json());
    };

    updateTrade = (tradeId, trade) => {
        return fetch(INVEST_API_URL + "trade/" + tradeId, {
            method: 'put',
            body: JSON.stringify(trade),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response =>
            response.json());
    };

    deleteTrade = (tradeId, trade) => {
        return fetch(INVEST_API_URL + 'trade/' + tradeId, {
                method: 'delete',
                body: JSON.stringify(trade),
                headers: {
                    'content-type': 'application/json'
                }
            }
        )
            .then(response => response.json());
    }

}
