import {heroesAPI} from './../../api/api';

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
                anotherProfileData: action.profileData
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

export const addProfileDataAC = (profileData) => {
    return {type: ADD_PROFILE_DATA, profileData: profileData}
}


export const getHeroDataThunkCreator = (heroId) => {
    return (dispatch) => {
        dispatch(showLoadingAC(true));
        heroesAPI.getHeroProfile(heroId).then(data => {
            dispatch(addProfileDataAC(data));
            dispatch(showLoadingAC(false));
        })
    }
}

export default ProfilePageReducer;