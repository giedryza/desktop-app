import axios from 'axios';
import { SET_LOADING, CLEAR_ERRORS } from '../actions/types';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const setLoading = bool => {
    return {
        type: SET_LOADING,
        payload: bool
    };
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

export const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);
