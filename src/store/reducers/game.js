import {SET_DATE} from '../actions';

const initialState = {
    player: {
      name: "Mario",
      surname: "Adinolfi",
    },
    date: null,
};

export const game = (state = initialState, action) => {
    switch (action.type) {
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