import {BASE_DATES, DATE_FORMAT, MONTH_LONG, YEAR} from "../../const";
import moment from "moment";
import {rangeArray} from "uvk";
import {getValue, setValue} from "../utils";
import {triggerDatesDescription} from "../simulators/events";

export const calendarHelper = {
    appendEvent(date, event, normalizedEvents) {
        const year = date.format(YEAR);
        const month = date.format(MONTH_LONG);
        const day = date.format('D');
        const path = `${year}.${month}.${day}`;
        if (getValue(normalizedEvents, path)) {
            getValue(normalizedEvents, path).push(event)
        } else {
            setValue(normalizedEvents, `${year}.${month}.${day}`, [event]);
        }
    },
    normalizeEvents(fixtures, info = {}) {
        const normalizedEvents = {};
        fixtures.forEach(f => {
            const date = moment(f.date);
            this.appendEvent(date, `${info.name} ${info.season} - Matchday ${f.index + 1}`, normalizedEvents);
        });

        const triggersFirstHalf = triggerDatesDescription[0];
        const triggersSecondHalf = triggerDatesDescription[1];
        const dateEvents = {
            [info.startYear]: triggersFirstHalf,
            [info.finishYear]: triggersSecondHalf,
        };
        Object.keys(dateEvents).forEach(year => {
            Object.keys(dateEvents[year]).forEach(partialDate => {
                const date = moment(`${partialDate}-${year}`, DATE_FORMAT);
                this.appendEvent(date, dateEvents[year][partialDate], normalizedEvents);
            });
        });
        return normalizedEvents;
    },
    getCalendarInfo(date, fixtures, info = {}) {
        const startYear = moment(fixtures.length > 0 ? fixtures[0].date : date).format(YEAR);
        const startDate = moment(`${BASE_DATES.GAME_START}${startYear}`, DATE_FORMAT);
        const finishDate = startDate.clone().add(1, 'year');
        let currentMonth = 0;
        const normalizedEvents = this.normalizeEvents(fixtures, {
            ...info,
            startYear,
            finishYear: finishDate.format(YEAR)
        });
        const months = rangeArray(finishDate.diff(startDate, 'months')).map(offset => {
            const tempMonth = startDate.clone().add(offset - 1, 'months');
            if (tempMonth.isSame(date, 'month')) currentMonth = offset - 1;
            const year = tempMonth.format(YEAR);
            const month = tempMonth.format(MONTH_LONG);
            return {
                name: month,
                year,
                days: rangeArray(tempMonth.daysInMonth()).map(d => {
                    return {
                        date: moment(`${d}-${tempMonth.format('M')}-${year}}`, DATE_FORMAT),
                        events: getValue(normalizedEvents, `${year}.${month}.${d}`) || []
                    }
                })
            }
        });
        return {months, currentMonth};
    }
};
