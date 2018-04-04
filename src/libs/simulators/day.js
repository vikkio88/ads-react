import {triggerDates} from "./events";
import {DAY_MONTH} from "../../const";
import {formatResult, resultAppender} from "./helpers";
import moment from "moment";
import {leagueHelper} from "../helpers/leagueHelper";
import eventTrigger from "./events/eventTrigger";

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
        resultAppender(status, leagueDayResult);

        eventTrigger({status, context}).forEach(e => {
            const result = e({status, context});
            status = result.status || status;
            context = result.context || context;
            resultAppender(status, result);
        });

        status.date = tomorrow;
        formatResult(status, context);
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