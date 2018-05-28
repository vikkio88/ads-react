import moment from "moment";
import {generator, randomizer} from '../generators';
import {playerHelper} from './playerHelper';
import {teamHelper} from './teamHelper';
import {round} from '../simulators';
import {newsGenerator, PAYLOAD_TYPES} from './newshelper';
import {DATE_FORMAT} from '../../const';
import {tableOrdering} from "../utils";
import {playerMatchStatBase} from "../models";

const LOSER_MODIFIERS = {
    decreases: [
        {
            chance: 75,
            value: 2
        }
    ],
    increases: [
        {
            chance: 10,
            value: 4
        }
    ]
};

const WINNER_MODIFIERS = {
    increases: [
        {
            chance: 80,
            value: 7
        }
    ],
    decreases: [
        {
            chance: 20,
            value: 3
        }
    ]
};

const leagueHelper = {
    parseRoundResults(results, teamTable) {
        results.forEach(r => {
            if (!r.isDraw) {
                const winnerRow = teamTable[r.winner];
                winnerRow.played += 1;
                winnerRow.points += 3;
                winnerRow.won += 1;
                winnerRow.goalsScored += Math.max(r.homeGoal, r.awayGoal);
                winnerRow.goalsConceded += Math.min(r.homeGoal, r.awayGoal);
                teamTable[r.winner] = winnerRow;

                const loserRow = teamTable[r.loser];
                loserRow.played += 1;
                loserRow.lost += 1;
                loserRow.goalsScored += Math.min(r.homeGoal, r.awayGoal);
                loserRow.goalsConceded += Math.max(r.homeGoal, r.awayGoal);
                teamTable[r.loser] = loserRow;
            } else {
                [r.winner, r.loser].forEach(team => {
                    const row = teamTable[team];
                    row.played += 1;
                    row.points += 1;
                    row.draw += 1;
                    row.goalsScored += r.homeGoal;
                    row.goalsConceded += r.homeGoal;
                    teamTable[team] = row;
                });
            }
        });

        return teamTable;
    },
    parseScorers(results, oldScorers) {
        results.forEach(r => {
            const {home, away, scorers} = r;
            scorers.home.forEach(s => {
                const playerKey = s.id;
                if (oldScorers[playerKey]) {
                    oldScorers[playerKey].goals += 1;
                    oldScorers[playerKey].team = home;
                } else {
                    oldScorers[playerKey] = {
                        goals: 1,
                        team: home,
                        player: s
                    }
                }
            });

            scorers.away.forEach(s => {
                const playerKey = s.id;
                if (oldScorers[playerKey]) {
                    oldScorers[playerKey].goals += 1;
                    oldScorers[playerKey].team = away;
                } else {
                    oldScorers[playerKey] = {
                        goals: 1,
                        team: away,
                        player: s
                    }
                }
            });
        });
        return oldScorers;
    },
    addLineupsRecord(results, oldLineups) {
        results.forEach(r => {
            const {lineups} = r;
            lineups.forEach(l => {
                if (oldLineups[l]) {
                    oldLineups[l].played++;
                } else {
                    oldLineups[l] = {...playerMatchStatBase};
                }
                oldLineups[l].rating = (randomizer.int(4, 9) + oldLineups[l].rating) / oldLineups[l].played
            });
        });
        return oldLineups;
    },
    updateStatus(result, teams) {
        result.forEach(r => {
            let winnerModifiers = WINNER_MODIFIERS;
            let loserModifiers = LOSER_MODIFIERS;
            if (r.isDraw) {
                winnerModifiers = generator.statusModifiers();
                loserModifiers = generator.statusModifiers();
            }

            teams[r.loser].roster = teams[r.loser].roster.map(p => {
                return playerHelper.updateStatus(p, loserModifiers);
            });
            teams[r.loser] = teamHelper.updateStatus(teams[r.loser]);

            teams[r.winner].roster = teams[r.winner].roster.map(p => {
                return playerHelper.updateStatus(p, winnerModifiers)
            });
            teams[r.winner] = teamHelper.updateStatus(teams[r.winner]);
        });

        return teamHelper.objectToTeamArray(teams);
    },
    updateStats(teamHash, stats) {
        let {table} = stats;
        table = leagueHelper.orderedTable(table);
        table.forEach((r, index) => {
            teamHash[r.name].stats.positionTrend.push(index + 1);
        });
    },
    simulateDay({table, fixture, scorers, lineups}, teams, date, playersTeam = null) {
        const todayRound = fixture.filter(r => moment(r.date).isSame(date)).pop();
        let messages = [];
        let news = [];
        let playerTeamMatch = null;
        if (todayRound) {
            const results = round.simulate(todayRound.matches, teams.list);

            playersTeam && results.forEach(r => {
                const {home, away} = r;
                if ([home, away].indexOf(playersTeam)) {
                    playerTeamMatch = r;
                }
            });

            leagueHelper.parseRoundResults(results, table);
            leagueHelper.parseScorers(results, scorers);
            leagueHelper.addLineupsRecord(results, lineups);
            todayRound.played = true;
            todayRound.results = results;
            leagueHelper.updateStatus(results, teams.hash);
            leagueHelper.updateStats(teams.hash, {table});

            news.push(
                newsGenerator.generate(
                    `Round ${todayRound.index + 1} played`,
                    `Results\n`,
                    date.format(DATE_FORMAT),
                    {type: PAYLOAD_TYPES.RESULT, data: results}
                )
            );
        }

        return {news, messages, playerTeamMatch};
    },
    orderedTable(table) {
        const orderedTable = [];
        if (!table) return orderedTable;
        Object.keys(table).forEach(t => {
            orderedTable.push(table[t]);
        });
        return orderedTable.sort(tableOrdering('points'));
    },
    orderedScorers(scorers) {
        const orderedTable = [];
        if (!scorers) return orderedTable;
        Object.keys(scorers).forEach(p => {
            orderedTable.push(scorers[p]);
        });
        return orderedTable.sort(tableOrdering('goals'));
    }
};

export {leagueHelper};