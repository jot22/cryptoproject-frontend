let FOLLOW_API_URL =
    'http://localhost:8080/api/following';

export default class FollowersService {
    static myInstance = null;

    static getInstance() {
        if (FollowersService.myInstance == null) {
            FollowersService.myInstance = new FollowersService();
        }
        return this.myInstance
    }

    findAllFollowings = () => {
        return fetch(FOLLOW_API_URL, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response =>
            response.json());
    };

    findFollowingById = (fid) =>
        fetch(FOLLOW_API_URL + '/' + fid)
            .then(response => response.json());

    findFollowingByUserId = (fid) => {
        let user = {
            user: fid
        }
        return fetch(FOLLOW_API_URL + '/' + fid + '/user', {
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    addToFollowing = (userId, following, newFollow, fid) => {
        let newFollowing = {
            user: following.user,
            newFollow: newFollow,
            following: following.following
        };
        return fetch(FOLLOW_API_URL + '/' + fid, {
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify(newFollowing),
            headers: {
                'content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    deleteFromFollowing = (userId, following, newFollow, fid) => {
        let newFollowing = {
            user: following.user,
            newFollow: newFollow,
            following: following.following
        };
        return fetch(FOLLOW_API_URL + '/' + fid, {
            credentials: 'include',
            method: 'DELETE',
            body: JSON.stringify(newFollowing),
            headers: {
                'content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

}
