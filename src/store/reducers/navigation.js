import {NAVIGATE} from '../actions';

const initialState = {
    view: 'dashboard'
};

export const navigation = (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATE:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
};