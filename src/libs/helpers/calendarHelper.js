import {BASE_DATES, DATE_FORMAT, MONTH_LONG, YEAR} from "../../const";
import moment from "moment";
import {rangeArray} from "uvk";
import {getValue, setValue} from "../utils";

export const calendarHelper = {
    normalizeEvents(fixtures, info = {}) {
        const normalizedEvents = {};
        fixtures.forEach(f => {
            const date = moment(f.date);
            const year = date.format(YEAR);
            const month = date.format(MONTH_LONG);
            const day = date.format('D');
            const path = `${year}.${month}.${day}`;
            const fixtureEvent = `${info.name} ${info.season} - Matchday ${f.index + 1}`;
            if (getValue(normalizedEvents, path)) {
                getValue(normalizedEvents, path).push(fixtureEvent)
            } else {
                setValue(normalizedEvents, `${year}.${month}.${day}`, [fixtureEvent]);
            }

        });

        return normalizedEvents;
    },
    /**
     months : {
        {
          name: 'June',
          year: 2018,
          days: [
            {
              date
              events:[
                string,
              ]
            }
          ]
        }

     }
     */
    getCalendarInfo(date, fixtures, info = {}) {
        const startYear = moment(fixtures[0].date).format(YEAR);
        const startDate = moment(`${BASE_DATES.GAME_START}${startYear}`, DATE_FORMAT);
        const finishDate = startDate.clone().add(1, 'year');
        let currentMonth = 0;
        const normalizedEvents = this.normalizeEvents(fixtures, info);
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
