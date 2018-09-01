import {generator, fixtureGenerator} from "../../../libs/generators";
import {calendarHelper} from "../../../libs/helpers";
import {BASE_DATES, DATE_FORMAT, MONTH_SHORT, YEAR} from "../../../const";
import moment from "moment";

describe("Calendar", () => {
    it("it returns correctly a list of month for this season", () => {
        const thisYear = moment().format(YEAR);
        const nextYear = moment().add(1, 'year').format(YEAR);
        const startDate = moment(moment(`${BASE_DATES.FIRST_MATCH}${thisYear}`, DATE_FORMAT));
        const fixture = fixtureGenerator.generate(generator.teams(4), startDate);
        const {months} = calendarHelper.getCalendarInfo(startDate.clone().subtract(1, 'day'), fixture);
        const seasonStart = moment(moment(`${BASE_DATES.GAME_START}${thisYear}`, DATE_FORMAT));
        const seasonFinish = moment(moment(`${BASE_DATES.GAME_START}${thisYear}`, DATE_FORMAT));
        expect(months[0].name).toBe(seasonStart.format(MONTH_SHORT));
        expect(months[0].year).toBe(thisYear);
        expect(months[months.length - 1].name).toBe(seasonFinish.format(MONTH_SHORT));
        expect(months[months.length - 1].year).toBe(nextYear);
    });
});
