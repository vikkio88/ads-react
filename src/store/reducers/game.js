import {NEW_GAME, SET_DATE} from '../actions';
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
        case SET_DATE: {
            return {
                ...state,
                status: {
                    ...state.status,
                    ...action.data
                }
            }
        }
        case NEW_GAME: {
            console.log(action.data);
            return {
                ...state,
                ...action.data
            }
        }
        default:
            return state;
    }
};