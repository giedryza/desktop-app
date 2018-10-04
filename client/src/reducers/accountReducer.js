import {
    ADD_TVSERIE,
    GET_TVSERIES,
    DELETE_TVSERIE,
    TVSERIE_LOADING
} from '../actions/types';

const initialState = {
    tvseries: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case TVSERIE_LOADING:
            return {
                ...state,
                loading: true
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
        default:
            return state;
    }
}
