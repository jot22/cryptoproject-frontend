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
        fetch(USER_API_URL + "user", {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>
            response.json());

    findUserById = (uid) =>
        fetch(USER_API_URL + 'user/' + uid)
            .then(response => response.json());

    findUserByUsername = (name) => {
        fetch(USER_API_URL + 'user/username/' + name)
            .then(response => response.json());
    };

    login = (user) => {
        return fetch(USER_API_URL + "login", {
            credentials: 'include',
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-Type': 'application/json'
            }
        }).then(response =>
            response.json())
            .catch(() => alert("Wrong username/password combination"));
    };


    logout = () => {
        return fetch(USER_API_URL + "logout", {
            credentials: 'include',
            method: 'post',
            headers: {
                'content-type': 'application/json'
            }
        })
    };

    profile = () => {
        return fetch(USER_API_URL + "profile", {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .catch(err => {
                return {type: 'GUEST'}
            });
    }

    updateUser = (userId, user) => {
        console.log(userId);
        return fetch(USER_API_URL + "user/" + userId, {
            credentials: "include",
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response =>
            response.json());
    };

    register = (user) => {

        return fetch(USER_API_URL + "register", {
            credentials: 'include',
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response =>
            response.json());
    }

}
