import { SET_LOADING } from '../actions/types';

// Clear errors
const setLoading = bool => {
    return {
        type: SET_LOADING,
        payload: bool
    };
};

export default setLoading;
