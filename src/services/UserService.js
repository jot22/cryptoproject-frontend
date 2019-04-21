let USER_API_URL =
    'http://localhost:8080/api/';


export default class UserService {
    static myInstance = null;

    static getInstance() {
        if (UserService.myInstance == null) {
            UserService.myInstance = new UserService();
        }
        return this.myInstance
    }

    findAllUsers = () =>
        fetch(USER_API_URL+ "user", {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>
            response.json());

    login = (user) => {
        return fetch(USER_API_URL + "login", {
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response =>
            response.json()).catch(() => alert("Wrong username/password combination"));
    }


    logout = () => {
        fetch(USER_API_URL + "logout", {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>
            response.json());
    }

    profile = () => {
        return fetch(USER_API_URL + "profile", {
            credentials: "include"
        })
            .then(response => response.json());
    }

    updateProfile = (user) => {
        return fetch(USER_API_URL + "profile", {
            credentials: "include",
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'content-type' : 'application/json'
            }
        })
            .then(response =>
                response.json());
    }

    register = (user) => {
        return fetch(USER_API_URL + "register", {
            credentials: "include",
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-type' : 'application/json'
            }
        }).then(response =>
            response.json());
    }
}
