let coinbaseURL = 'https://api.pro.coinbase.com/';

export default class CoinbaseService {
    static myInstance = null;
    static getInstance() {
        if (CoinbaseService.myInstance == null) {
            CoinbaseService.myInstance = new CoinbaseService();
        }
        return this.myInstance
    }

    getBTCtoUSD = () => {
        return fetch(coinbaseURL + 'products/BTC-USD/stats')
            .then(response => response.json());
    };

    getETHtoUSD = () => {
        return fetch(coinbaseURL + 'products/ETH-USD/stats')
            .then(response => response.json());
    }

}

