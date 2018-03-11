import {match} from './match';
import {teamHelper} from '../helpers';

const round = {
    simulate(matches, teams) {
        const teamsObject = teamHelper.teamsToObject(teams);
        const results = [];
        matches.forEach(m => {
            results.push(match.simulate(teamsObject[m.home], teamsObject[m.away]));
        });
        return results;
    }
};

export {round};