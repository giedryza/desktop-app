import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import tvseriesReducer from './tvseriesReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    tvseries: tvseriesReducer
});
