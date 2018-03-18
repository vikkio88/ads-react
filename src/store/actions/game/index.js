import moment from "moment";
import {baseGameState} from "../../../libs/models";
import {BASE_DATES, YEAR} from "../../../const";

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
    data = {
        ...baseGameState,
        ...data,
        date: moment(`${BASE_DATES.GAME_START}${moment().format(YEAR)}`)
    };
    return {
        type: NEW_GAME,
        data
    }
};

export const nextDay = date => {
    date = date.add(1, 'days');
    return {
        type: SET_DATE,
        data: {
            date
        }
    };
};
