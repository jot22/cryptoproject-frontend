let CRYPTO_API_URL =
    'http://localhost:8080/api/coin/';

let CRYPTO_API_URLS =
    'http://localhost:8080/api/coins/';

export default class CoinMarketService {
    static myInstance = null;

    static getInstance() {
        if (CoinMarketService.myInstance == null) {
            CoinMarketService.myInstance = new CoinMarketService();
        }
        return this.myInstance
    }

    findCryptoBySymbol = (symbol) => {
        return fetch(CRYPTO_API_URL + symbol)
            .then(response => response.json());
    }

    findCryptoById = (id) => {
        return fetch(CRYPTO_API_URLS + id)
            .then(response => response.json());
    }

    findAllCrypto = () =>{
        return fetch(CRYPTO_API_URL)
            .then(response => response.json());
    }
}
