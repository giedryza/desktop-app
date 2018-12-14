import {
    ADD_TVSERIE,
    GET_TVSERIES,
    DELETE_TVSERIE,
    SET_LOADING,
    GET_RECIPES,
    GET_RECIPE,
    ADD_RECIPE,
    DELETE_RECIPE
} from '../actions/types';

const initialState = {
    tvseries: [],
    recipes: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case GET_TVSERIES:
            return {
                ...state,
                tvseries: action.payload,
                loading: false
            };
        case ADD_TVSERIE:
            return {
                ...state,
                tvseries: [action.payload, ...state.tvseries]
            };
        case DELETE_TVSERIE:
            return {
                ...state,
                tvseries: state.tvseries.filter(
                    tvserie => tvserie._id !== action.payload
                )
            };
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                loading: false
            };
        case GET_RECIPE:
            return {
                ...state,
                recipe: action.payload,
                loading: false
            };
        case ADD_RECIPE:
            return {
                ...state,
                recipes: [action.payload, ...state.recipes]
            };
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(
                    recipe => recipe._id !== action.payload
                )
            };
        default:
            return state;
    }
}
