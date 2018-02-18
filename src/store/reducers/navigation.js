import {NAVIGATE} from '../actions';

const initialState = {
    view: 'dashboard'
};

export const navigation = (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATE:
            return {
                ...action.data,
            };
        default:
            return state;
    }
};