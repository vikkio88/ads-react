import moment from 'moment';
import {fixtureGenerator} from '../../generators'
import {newsGenerator} from '../../helpers';
import {DATE_FORMAT} from '../../../const'
import leagueDefinitions from "../../../config/providers/leagueDefinitions";

const buildFixture = ({status, context}) => {
    const nationality = status.player.nationality;
    const thisYear = moment(status.date).format('YYYY');
    const nextYear = moment(status.date).add(1, 'year').format('YYYY');
    const {teams} = context;
    const fixture = fixtureGenerator.generate(
        teams.list,
        moment(`02-08-${thisYear}`, DATE_FORMAT)
        //moment(`26-08-${thisYear}`, DATE_FORMAT)
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
        `Presented the new match calendar for ${context.league.name} ${context.league.season}`,
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


export const triggerDates = {
    '30-07': [buildFixture],
    '01-09': [marketClose],
};