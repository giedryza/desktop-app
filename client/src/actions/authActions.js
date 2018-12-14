import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../utils/helperActions';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

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
