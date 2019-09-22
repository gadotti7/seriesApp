import { combineReducers } from 'redux';

import userReducer from './userReducer'; 
import SerieFormReducer from './serieFormReducer'; 

export default combineReducers({
    user: userReducer,
    serieForm: SerieFormReducer,
})