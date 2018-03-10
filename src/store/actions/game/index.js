export const NEW_GAME = 'new_game';
export const SET_DATE = 'set_date';

export const newGame = data => {
    return {
        type: NEW_GAME,
        data
    }
};

export const setDate = date => {
    return {
        type: SET_DATE,
        data: {
            date
        }
    };
};

export const nextDay = date => {
    date = date.plus({days: 1});
    return {
        type: SET_DATE,
        data: {
            date
        }
    };
};
