import {LOADING_FINISHED, LOADING_START, NEW_GAME, NEXT_DAY} from '../actions';
import {LOAD_GAME, MODIFY_STATUS} from "../actions/game";

const initialState = {
    loading: false,
    status: {},
    context: {}
};

export const game = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START: {
            return {
                ...state,
                loading: true
            }
        }
        case LOADING_FINISHED: {
            return {
                ...state,
                loading: false
            }
        }
        case LOAD_GAME: {
            return {
                ...action.data
            }
        }
        case NEXT_DAY:
        case NEW_GAME: {
            return {
                ...state,
                ...action.data
            }
        }
        case MODIFY_STATUS: {
            return {
                ...state,
                status: {
                    ...state.status,
                    ...action.data
                }
            }
        }
        default:
            return state;
    }
};
