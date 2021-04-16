import {heroesAPI} from './../../api/api';

const GET_HEROES = 'GET_HEROES';
const SHOW_LOADING = 'SHOW_LOADING';
const GET_PAGE = 'GET_PAGE';
const GET_HOMEWORLD = 'GET_HOMEWORLD';

let defaultState = ({
    totalCount: null,
    count: 10,
    people: [],
    pageNumber: 1,
    isLoading: true,
    homeworldNames: [],
    homeworldsArray: []
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
                homeworldNames: [action.homeworldName]
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

export const getHomeworldAC = (homeworldName) => {
    return {type: GET_HOMEWORLD, homeworldName: homeworldName.name}
}

export const setHeroesThunkCreator = (count, pageNumber) => {
    return (dispatch) => {
        heroesAPI.getHeroes(count, pageNumber)
        .then(data => dispatch(getHeroesAC(data)));
    }
}

export const setHomeworldThunkCreator = (request) => {
    return (dispatch) => {
        heroesAPI.getHomeworld(request)
        .then(data => dispatch(getHomeworldAC(data)));
    }
}

export default heroesReducer;