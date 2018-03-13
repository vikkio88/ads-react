import {NAVIGATE} from '../actions';
import {NAVIGATE_POP, NAVIGATE_PUSH} from "../actions/navigation";

const initialState = {
    view: 'dashboard',
    stack: [],
    payload: {}
};

export const navigation = (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATE: {
            return {
                ...state,
                ...action.data,
                stack: []
            };
        }
        case NAVIGATE_PUSH: {
            const {stack, payload} = state;
            const {view} = action.data;
            stack.push({view: state.view, payload});
            return {
                ...state,
                view,
                payload: action.data.payload,
                stack
            }
        }
        case NAVIGATE_POP: {
            const {stack} = state;
            const lastView = stack.pop() || {};
            const view = lastView.view || 'dashboard';
            const payload = lastView.payload || {};
            return {
                ...state,
                view,
                payload,
                stack
            }
        }
        default:
            return state;
    }
};