// let CRYPTO_API_URL =
//     'http://localhost:8080/api/crypto';
let CRYPTO_API_URL =
    'https://whispering-spire-33999.herokuapp.com/api/crypto';

export default class CryptoService {
    static myInstance = null;

    static getInstance() {
        if (CryptoService.myInstance == null) {
            CryptoService.myInstance = new CryptoService();
        }
        return this.myInstance
    }

    findAllCrypto = () => {
        return fetch(CRYPTO_API_URL, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response =>
            response.json());
    };

}
