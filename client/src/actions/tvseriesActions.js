import axios from 'axios';
import clearErrors from '../utils/clearErrors';
import {
    GET_ERRORS,
    ADD_TVSERIE,
    GET_TVSERIES,
    DELETE_TVSERIE,
    TVSERIE_LOADING
} from './types';

// Add TvSerie
export const addTvserie = imdbId => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/users/tvseries', imdbId)
        .then(res =>
            dispatch({
                type: ADD_TVSERIE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Get TvSeries
export const getTvseries = () => dispatch => {
    dispatch(setTvserieLoading());
    axios
        .get('/api/users/tvseries')
        .then(res =>
            dispatch({
                type: GET_TVSERIES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_TVSERIES,
                payload: []
            })
        );
};

// Delete TvSerie
export const deleteTvserie = id => dispatch => {
    axios
        .delete(`/api/users/tvseries/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_TVSERIE,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set loading state
export const setTvserieLoading = () => {
    return {
        type: TVSERIE_LOADING
    };
};
