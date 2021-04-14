import {createStore, combineReducers, applyMiddleware} from 'redux';
import facebookReducer from './reducers/facebookReducer';
import usersReducer from './reducers/usersReducer';
import profileReducer from './reducers/profileReducer';

import thunk from 'redux-thunk';

let reducers = combineReducers({
    facebookData: facebookReducer,
    usersData: usersReducer,
    profileData: profileReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;