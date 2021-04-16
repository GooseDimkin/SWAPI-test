import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://swapi.dev/api/',
    withCredentials: false
});

export const heroesAPI = {
    getHeroes: (count, pageNumber) => {
        return instance.get('people?page=' + pageNumber)
        .then(response => response.data);
    },
    getHeroProfile: (heroId) => {
        return instance.get('people/' + heroId)
        .then(response => response.data);
    },
    getHomeworld: (request) => {
        return (
            axios.get(request)
            .then(response => response.data)
        );
    },
};