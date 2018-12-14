import axios from 'axios';
import { setLoading, clearErrors } from '../utils/helperActions';
import { GET_ERRORS, ADD_TVSERIE, GET_TVSERIES, DELETE_TVSERIE } from './types';

// Add TvSerie
export const addTvserie = imdbId => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/tvseries', imdbId)
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
    dispatch(setLoading(true));
    axios
        .get('/api/tvseries')
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
        .delete(`/api/tvseries/${id}`)
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

// Clear Tvseries
export const clearTvseries = () => {
    return {
        type: GET_TVSERIES,
        payload: []
    };
};
