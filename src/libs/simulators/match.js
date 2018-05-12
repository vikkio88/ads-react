import {teamHelper} from '../helpers';
import {randomizer} from '../generators/randomizer';

const match = {
    simulate(homeTeam, awayTeam) {
        let homeGoal = 0;
        let awayGoal = 0;
        let isDraw = false;
        let winner = homeTeam.name;
        let loser = awayTeam.name;
        const homePoint = this.points(homeTeam);
        const awayPoint = this.points(awayTeam);

        if (randomizer.chance(80)) {
            if ((homePoint - awayPoint) < 0) {
                awayGoal = Math.round((awayPoint - homePoint) % 6);
                homeGoal += this.fluke();
                awayGoal += this.fluke();
                homeGoal += this.bonusHome();
            } else {
                homeGoal = Math.round((homePoint - awayPoint) % 6);
                awayGoal += this.fluke();
                homeGoal += this.fluke();
            }
        } else {
            homeGoal += this.fluke();
            awayGoal += this.fluke();
            homeGoal += this.bonusHome();
        }
        homeGoal += this.bonusAge(homeTeam);
        awayGoal += this.bonusAge(awayTeam);

        if (teamHelper.isOffensive(homeTeam)) {
            homeGoal += randomizer.chance(50) ? randomizer.int(1, 2) : 0;
            awayGoal += randomizer.chance(20) ? 1 : 0;
        }

        if (teamHelper.isOffensive(awayTeam)) {
            awayGoal += randomizer.chance(50) ? randomizer.int(1, 2) : 0;
            homeGoal += randomizer.chance(20) ? 1 : 0;
        }

        if (teamHelper.isDefensive(homeTeam)) {
            homeGoal -= randomizer.chance(50) ? 1 : 0;
        }

        if (teamHelper.isDefensive(awayTeam)) {
            awayGoal -= randomizer.chance(50) ? 1 : 0;
        }

        homeGoal = homeGoal < 0 ? 0 : homeGoal;
        awayGoal = awayGoal < 0 ? 0 : awayGoal;


        if (homeGoal < awayGoal) {
            loser = homeTeam.name;
            winner = awayTeam.name;
        }

        if (homeGoal === awayGoal) {
            isDraw = true;
        }
        const {scorers, lineups} = this.teamStats(homeTeam, awayTeam, homeGoal, awayGoal);
        return {
            home: homeTeam.name,
            away: awayTeam.name,
            winner,
            loser,
            isDraw,
            homeGoal,
            awayGoal,
            scorers,
            lineups
        }
    },
    points(team) {
        let points = teamHelper.averageSkill(team);
        points += this.malusModule(teamHelper.canPlayModule(team));
        return points;
    },
    teamStats(homeTeam, awayTeam, homeGoal, awayGoal) {
        const homeLineUp = teamHelper.lineups(homeTeam);
        const awayLineup = teamHelper.lineups(awayTeam);
        const home = teamHelper.scorers(homeTeam, homeLineUp, homeGoal);
        const away = teamHelper.scorers(awayTeam, awayLineup, awayGoal);
        return {
            lineups: [...homeLineUp, ...awayLineup],
            scorers: {
                home,
                away
            }
        }
    },
    bonusAge(team) {
        const avgAge = teamHelper.averageAge(team);
        if (avgAge < 23 || avgAge > 33) {
            return this.fluke();
        }
        return 0;
    },
    bonusHome() {
        return randomizer.chance(66) ? 1 : 0;
    },
    malusModule(teamCanPlay) {
        const modifier = randomizer.int(1, 10);
        if (!teamCanPlay) {
            return -1 * modifier;
        }
        return modifier;
    },
    fluke() {
        return randomizer.int(0, 3);
    }
};

export {match};