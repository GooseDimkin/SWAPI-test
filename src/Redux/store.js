import {createStore, combineReducers, applyMiddleware} from 'redux';
import facebookReducer from './reducers/facebookReducer';
import heroesReducer from './reducers/heroesReducer';
import profileReducer from './reducers/profileReducer';

import thunk from 'redux-thunk';

let reducers = combineReducers({
    facebookData: facebookReducer,
    heroesData: heroesReducer,
    profileData: profileReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;