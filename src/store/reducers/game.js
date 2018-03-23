import {NEW_GAME, NEXT_DAY} from '../actions';
import {LOAD_GAME} from "../actions/game";

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
        default:
            return state;
    }
};