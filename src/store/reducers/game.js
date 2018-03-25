import {NEW_GAME, NEXT_DAY} from '../actions';
import {LOAD_GAME, MODIFY_STATUS} from "../actions/game";

const initialState = {
    status: {},
    context: {}
};

export const game = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GAME: {
            return {
                ...action.data
            }
        }
        case NEXT_DAY: {
            return {
                ...state,
                ...action.data
            }
        }
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