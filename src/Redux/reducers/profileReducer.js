import {usersAPI} from './../../api/api';

const ADD_PROFILE_DATA = 'ADD-PROFILE-DATA';
const SHOW_LOADING = 'SHOW_LOADING';

let defaultState = {
    anotherProfileData: null,
    showLoading: false
}

let ProfilePageReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_PROFILE_DATA: 
            return {
                ...state,
                anotherProfileData: action.profileData,
                showLoading: false
            }
        case SHOW_LOADING: 
            return {
                ...state,
                showLoading: action.isShow
            }

        default: 
            return state;
    }
}

export const showLoadingAC = (isShow) => {
    return {type: SHOW_LOADING, isShow: isShow}
}

export const addProfileDataActionCreator = (profileData) => {
    return {type: ADD_PROFILE_DATA, profileData: profileData}
}


export const getUserDataThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(showLoadingAC(true));
        usersAPI.getUserProfile(userId).then(data => {
            dispatch(addProfileDataActionCreator(data));
            dispatch(showLoadingAC(false));
        })
    }
}

export default ProfilePageReducer;