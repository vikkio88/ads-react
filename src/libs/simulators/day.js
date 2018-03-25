import {triggerDates} from "./events";
import {DAY_MONTH} from "../../const";
import {resultAppender} from "./helpers";
import moment from "moment";
import {leagueHelper} from "../helpers/leagueHelper";

export const day = {
    simulate(game) {
        let {status, context} = game;
        const today = moment(status.date);
        const tomorrow = moment(status.date).add(1, 'day');
        const dateTriggeredEvent = triggerDates[tomorrow.format(DAY_MONTH)];

        dateTriggeredEvent && dateTriggeredEvent.forEach(e => {
            const result = e({status, context});
            status = result.status;
            context = result.context;
            resultAppender(status, result);
        });

        const leagueDayResult = leagueHelper.simulateDay(context.league, context.teams, today, status.team);
        console.log(leagueDayResult);
        resultAppender(status, leagueDayResult);


        status.date = tomorrow;
        return {
            status: {
                ...status,
            },
            context: {
                ...context
            }
        };
    }
};