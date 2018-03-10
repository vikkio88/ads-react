export const NEW_GAME = 'new_game';
export const LOAD_GAME = 'load_game';
export const SET_DATE = 'set_date';

export const loadGame = () => {
    const game = localStorage.getItem('game') || null;
    return {
        type: LOAD_GAME,
        data: {
            ...game
        }
    }
};

export const newGame = data => {
    return {
        type: NEW_GAME,
        data
    }
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
