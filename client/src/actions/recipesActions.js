import axios from 'axios';
import setLoading from '../utils/setLoading';
import clearErrors from '../utils/clearErrors';
import {
    GET_ERRORS,
    GET_RECIPES,
    GET_RECIPE,
    ADD_RECIPE,
    DELETE_RECIPE
} from './types';

// Get Recipes
export const getRecipes = () => dispatch => {
    dispatch(setLoading());
    axios
        .get('/api/recipes')
        .then(res =>
            dispatch({
                type: GET_RECIPES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_RECIPES,
                payload: []
            })
        );
};

// Get Recipe by id
export const getRecipe = id => dispatch => {
    axios
        .get(`/api/recipes/${id}`)
        .then(res =>
            dispatch({
                type: GET_RECIPE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_RECIPE,
                payload: {}
            })
        );
};

// Add Recipe
export const addRecipe = data => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/recipes', data)
        .then(res =>
            dispatch({
                type: ADD_RECIPE,
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

// Edit Recipe
export const editRecipe = (data, id, history) => dispatch => {
    dispatch(clearErrors());
    axios
        .patch(`/api/recipes/${id}`, data)
        .then(res => history.push('/recipes'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete Recipe
export const deleteRecipe = id => dispatch => {
    axios
        .delete(`/api/recipes/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_RECIPE,
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

// Clear Recipes
export const clearRecipes = () => {
    return {
        type: GET_RECIPES,
        payload: []
    };
};

// Clear Recipe
export const clearRecipe = () => {
    return {
        type: GET_RECIPE,
        payload: {}
    };
};
