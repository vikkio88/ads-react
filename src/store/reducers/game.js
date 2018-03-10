import {NEW_GAME, SET_DATE} from '../actions';

const initialState = {
    date: null,
    player: {
        name: "Mario",
        surname: "Adinolfi",
    },
};

export const game = (state = initialState, action) => {
    switch (action.type) {
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