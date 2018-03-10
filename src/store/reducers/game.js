import {NEW_GAME, SET_DATE} from '../actions';
import {LOAD_GAME} from "../actions/game";

const initialState = {
    date: null,
    player: {
        name: "Mario",
        surname: "Adinolfi",
    },
};

export const game = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GAME: {
            return {
                ...action.data
            }
        }
        case NEW_GAME:
        case SET_DATE: {
            return {
                ...state,
                ...action.data
            }
        }
        default:
            return state;
    }
};