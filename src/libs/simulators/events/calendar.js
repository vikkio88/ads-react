import moment from 'moment';
import {fixtureGenerator} from '../../generators'
import {newsGenerator} from '../../helpers';
import {BASE_DATES, DATE_FORMAT, YEAR} from '../../../const'
import leagueDefinitions from "../../../config/providers/leagueDefinitions";

const buildFixture = ({status, context}) => {
    const nationality = status.player.nationality;
    const thisYear = moment(status.date).format(YEAR);
    const nextYear = moment(status.date).add(1, 'year').format(YEAR);
    const {teams} = context;
    const fixture = fixtureGenerator.generate(
        teams.list,
        moment(`${BASE_DATES.FIRST_MATCH}${thisYear}`, DATE_FORMAT)
    );

    context = {
        ...context,
        league: {
            name: leagueDefinitions[nationality].league,
            season: `${thisYear}-${nextYear}`,
            ...context.league,
            fixture
        }
    };

    const news = newsGenerator.generate(
        'New Season Calendar!',
        `Presented the new match calendar for **${context.league.name} ${context.league.season}**`,
        moment(status.date).format(DATE_FORMAT)
    );

    return {status, context, news};

};

const marketClose = ({status, context}) => {
    status = {
        ...status,
        marketOpen: false
    };

    const news = newsGenerator.generate(
        'Transfer Market Closed!',
        'Transfer Market officially closed',
        moment(status.date).format(DATE_FORMAT)
    );

    return {status, context, news};
};

const marketOpen = ({status, context}) => {
    status = {
        ...status,
        marketOpen: true
    };

    const news = newsGenerator.generate(
        'Transfer Market Opens!',
        'Transfer Market officially opens',
        moment(status.date).format(DATE_FORMAT)
    );

    return {status, context, news};
};


export const triggerDates = {
    '01-06': [marketOpen],
    '30-07': [buildFixture],
    '01-09': [marketClose],
    '01-01': [marketOpen],
    '31-01': [marketClose],
};

export const triggerDatesDescription = [
    {
        '01-06': 'Transfer Market Opens',
        '30-07': 'Calendar Presented',
        '01-09': 'Transfer Market Closes',
    },
    {
        '01-01': 'Transfer Market Opens (Winter Session)',
        '31-01': 'Transfer Market Closes (Winter Session)',
    }
];
