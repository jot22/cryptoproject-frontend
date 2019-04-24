let CRYPTO_API_URL =
    'http://localhost:8080/api/';

export default class CoinMarketService {
    static myInstance = null;

    static getInstance() {
        if (CoinMarketService.myInstance == null) {
            CoinMarketService.myInstance = new CoinMarketService();
        }
        return this.myInstance
    }

    findCryptoBySymbol = (symbol) => {
        return fetch(CRYPTO_API_URL + 'coin/' + symbol)
            .then(response => response.json());
    };

    findCryptoById = (id) => {
        return fetch(CRYPTO_API_URL + 'coins/' + id)
            .then(response => response.json());
    };

    findAllCrypto = () => {
        return fetch(CRYPTO_API_URL + 'coin')
            .then(response => response.json());
    };

    getGlobalMetrics = () => {
        return fetch(CRYPTO_API_URL + 'globalmetrics')
            .then(response => response.json());
    };
    
}
