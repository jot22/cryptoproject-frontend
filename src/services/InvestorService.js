let INVEST_API_URL =
    'http://localhost:8080/api/';


export default class UserService {
    static myInstance = null;

    static getInstance() {
        if (UserService.myInstance == null) {
            UserService.myInstance = new UserService();
        }
        return this.myInstance
    }

    requestTrade = (investorId, brokerId, cryptoId, trade) => {
        return fetch(INVEST_API_URL + "/investor/" + investorId + "/broker/" + brokerId
            + "/crypto/" + cryptoId + "/trade", {
            credentials: 'include',
            method: 'post',
            body: JSON.stringify(trade),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());
    };

    register = (user) => {

        return fetch(INVEST_API_URL + "register", {
            credentials: 'include',
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response =>
            response.json());
    };
}
