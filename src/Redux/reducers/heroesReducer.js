import {heroesAPI} from './../../api/api';

const GET_HEROES = 'GET_HEROES';
const SHOW_LOADING = 'SHOW_LOADING';
const GET_PAGE = 'GET_PAGE';
const GET_HOMEWORLD = 'GET_HOMEWORLD';
const GET_VEGICLE = 'GET_VEGICLE';
const GET_FILM = 'GET_FILM';

let defaultState = ({
    totalCount: null,
    count: 10,
    people: [],
    pageNumber: 1,
    isLoading: true,
    homeworldsNames: [],
    vehiclesNames: [],
    filmTitles: []
});

let heroesReducer = (state = defaultState, action) => {
    switch(action.type) {
        case GET_HEROES: 
            return {
                ...state,
                people: action.heroesData.results,
                totalCount: action.heroesData.count,
                isLoading: false
            }

        case GET_PAGE:
            return {
                ...state,
                pageNumber: action.pageNumber
            }

        case SHOW_LOADING: 
            return {
                ...state,
                isLoading: true
            }

        case GET_HOMEWORLD:
            return {
                ...state,
                homeworldsNames: action.homeworldsNames
            }

        case GET_VEGICLE:
            return {
                ...state,
                vehiclesNames: action.vehiclesNames
            }
        
        case GET_FILM: 
            return {
                ...state,
                filmTitles: action.filmTitles
            }

        default: 
            return state;
    }
}

export const getPageAC = (pageNumber) => {
    return {type: GET_PAGE, pageNumber: pageNumber}
}

export const showLoadingAC = () => {
    return {type: SHOW_LOADING}
}

export const getHeroesAC = (heroesData) => {
    return {type: GET_HEROES, heroesData: heroesData}
}

export const setHomeworldAC = (homeworldsNames) => {
    return {type: GET_HOMEWORLD, homeworldsNames: homeworldsNames}
}

export const setVehiclesAC = (vehiclesNames) => {
    return {type: GET_VEGICLE, vehiclesNames: vehiclesNames}
}

export const setFilmAC = (filmTitles) => {
    return {type: GET_FILM, filmTitles: filmTitles}
}

export const setHeroesThunkCreator = (count, pageNumber) => {
    return (dispatch) => {
        heroesAPI.getHeroes(count, pageNumber)
        .then(data => dispatch(getHeroesAC(data)));
    }
}

export default heroesReducer;