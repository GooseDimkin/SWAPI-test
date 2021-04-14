import {usersAPI} from './../../api/api';

const GET_USERS = 'GET_USERS';
const SHOW_LOADING = 'SHOW_LOADING';
const GET_PAGE = 'GET_PAGE';
const GET_HOMEWORLD = 'GET_HOMEWORLD';

let defaultState = ({
    totalCount: null,
    count: 10,
    people: [],
    pageNumber: 1,
    isLoading: true,
    homeworldNames: []
});

let usersReducer = (state = defaultState, action) => {
    switch(action.type) {
        case GET_USERS: 
            return {
                ...state,
                people: action.usersData.results,
                totalCount: action.usersData.count,
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

export const getUsersAC = (usersData) => {
    return {type: GET_USERS, usersData: usersData}
}

export const getHomeworldAC = (homeworldName) => {
    return {type: GET_HOMEWORLD, homeworldName: homeworldName.name}
}

export const setUsersThunkCreator = (count, pageNumber) => {
    return (dispatch) => {
        usersAPI.getUsers(count, pageNumber)
        .then(data => dispatch(getUsersAC(data)));
    }
}

export const setHomeworldThunkCreator = (request, userID) => {
    return (dispatch) => {
        usersAPI.getHomeworld(request, userID)
        .then(data => dispatch(getHomeworldAC(data)));
    }
}

export default usersReducer;