import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://swapi.dev/api/',
    withCredentials: false
});

export const usersAPI = {
    getUsers: (count, pageNumber) => {
        return instance.get('people?page=' + pageNumber)
        .then(response => response.data);
    },
    getUserProfile: (userId) => {
        return instance.get('people/' + userId)
        .then(response => response.data);
    },
    getHomeworld: (request, userID) => {
        debugger;
        return (
            axios.get(request[userID - 1])
            .then(response => response.data)
        );
    },
};