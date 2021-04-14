const GET_USER_DATA = 'GET_USER_DATA';

let defaultState = ({
    isLogginedIn: false,
    userID: null,
    name: null,
    email: null,
    picture: null
});

let facebookReducer = (state = defaultState, action) => {
    switch(action.type) {
        case GET_USER_DATA: 
            return {
                ...state,
                userID: action.userData.id,
                name: action.userData.name,
                email: action.userData.email,
                picture: action.userData.picture.data.url,
                isLogginedIn: true
            }

        default: 
            return state;
    }
}

export const getUserDataAC = (userData) => {
    return {type: GET_USER_DATA, userData: userData}
}

export default facebookReducer;