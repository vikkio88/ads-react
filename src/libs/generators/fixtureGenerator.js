import moment from 'moment';

const fixtureGenerator = {
    generate(teams = [], startDate = moment()) {
        const numberOfTeams = teams.length;
        const totalRounds = numberOfTeams - 1;
        const matchesPerRound = numberOfTeams / 2;
        const firstHalf = [];
        const secondHalf = [];
        for (let round = 0; round < totalRounds; round++) {
            const tempRoundFirstHalf = [];
            const tempRoundSecondHalf = [];
            for (let match = 0; match < matchesPerRound; match++) {
                const home = (round + match) % (numberOfTeams - 1);
                let away = (numberOfTeams - 1 - match + round) % (numberOfTeams - 1);
                if (match === 0) {
                    away = numberOfTeams - 1;
                }
                tempRoundFirstHalf.push({home: teams[home].name, away: teams[away].name});
                tempRoundSecondHalf.push({home: teams[away].name, away: teams[home].name});
            }
            firstHalf.push({
                index: round,
                date: moment(startDate).add(round, 'week').format(),
                matches: tempRoundFirstHalf,
                played: false
            });
            secondHalf.push({
                index: round + totalRounds,
                date: moment(startDate).add(round + totalRounds, 'week').format(),
                matches: tempRoundSecondHalf,
                played: false
            });
        }
        return firstHalf.concat(secondHalf);
    }
};

export {fixtureGenerator}