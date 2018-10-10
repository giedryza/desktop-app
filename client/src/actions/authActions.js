import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import clearErrors from '../utils/clearErrors';
import { GET_ERRORS, SET_CURRENT_USER, GET_TVSERIES } from './types';

// Register User
export const registerUser = userData => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => dispatch(loginUser(userData)))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login User
export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Logout User
export const logoutUser = () => dispatch => {
    dispatch(clearTvseries());
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Delete User
export const deleteUser = () => dispatch => {
    if (
        window.confirm(
            'Are you sure you want to delete your Account? All the information will be lost.'
        )
    ) {
        dispatch(clearTvseries());
        axios
            .delete('/api/users')
            .then(res => dispatch(logoutUser()))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
};

// Clear errors
const clearTvseries = () => {
    return {
        type: GET_TVSERIES,
        payload: []
    };
};

export default clearErrors;
