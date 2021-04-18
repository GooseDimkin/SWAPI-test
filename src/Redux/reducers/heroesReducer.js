import {heroesAPI} from './../../api/api';

const GET_HEROES = 'GET_HEROES';
const SHOW_LOADING = 'SHOW_LOADING';
const GET_PAGE = 'GET_PAGE';
const GET_HOMEWORLD = 'GET_HOMEWORLD';
const GET_VEHICLE = 'GET_VEHICLE';
const CHECK = 'CHECK';

let defaultState = ({
    totalCount: null,
    count: 10,
    people: [],
    pageNumber: 1,
    isLoading: true,
    homeworldName: [],
    vehiclesName: [],
    vehiclesModel: [],
    checkStatus: null
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
                homeworldName: [action.homeworldName]
            }

        case GET_VEHICLE:
            return {
                ...state,
                vehiclesName: [action.vehiclesName],
                vehiclesModel: [action.vehiclesModel]
            }

        case CHECK:
            return {
                ...state,
                checkStatus: action.status
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

export const getVehiclesAC = (vehiclesName) => {
    return {type: GET_VEHICLE, vehiclesName: vehiclesName.name, vehiclesModel: vehiclesName.model}
}

const check = (status) => {
    return {type: CHECK, status: status}
}

export const checkThunkCreator = (status) => {
    return (dispatch) => dispatch(check(status));
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

export const setOneVehicleThunkCreator = (request) => {
    return (dispatch) => {
        heroesAPI.getVehicles(request)
        .then(data => dispatch(getVehiclesAC(data)));
    }
}

export const setMoreVehiclesThunkCreator = (request, i) => {
    return (dispatch) => {
        heroesAPI.getVehicles(request[i])
        .then(data => dispatch(getVehiclesAC(data)))
    }
}

export default heroesReducer;