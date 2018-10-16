import * as events from './events';

export default {
    noMoreGamesToPlay({context}) {
        const {fixture} = context.league;
        if (fixture.length && fixture.filter(r => !r.played).length === 0) {
            return events.seasonOver;
        }
    },
    notHired({status}) {
        const {job} = status;
        if (job === null) {
            return events.teamOffersContract
        }
    }
};
