import moment from "moment";
import {baseGameStatus} from "../../../libs/models";
import {BASE_DATES, DATE_FORMAT, YEAR} from "../../../const";
import {day} from "../../../libs/simulators";

export const NEW_GAME = 'new_game';
export const LOAD_GAME = 'load_game';
export const NEXT_DAY = 'next_day';

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
    const {status, context} = data;
    data = {
        status: {
            ...baseGameStatus,
            ...status,
            date: moment(`${BASE_DATES.GAME_START}${moment().format(YEAR)}`, DATE_FORMAT)
        },
        context
    };
    return {
        type: NEW_GAME,
        data
    }
};

export const nextDay = game => {
    return {
        type: NEXT_DAY,
        data: {
            ...day.simulate(game)
        }
    };
};
