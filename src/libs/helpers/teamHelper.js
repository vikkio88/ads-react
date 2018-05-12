import {randomizer, range} from 'uvk';
import {extendedModules} from '../../const';
import {positions} from '../../const';
import {byPlayerAbilityToScore, byPlayerSkill, onlyPlayerPosition} from "../utils";

const teamHelper = {
    createCleanTable(teams) {
        const table = {};
        teams.forEach(t => {
            table[t.name] = {
                name: t.name,
                played: 0,
                won: 0,
                lost: 0,
                draw: 0,
                points: 0,
                goalsScored: 0,
                goalsConceded: 0
            };
        });

        return table;
    },
    teamsToObject(teams) {
        const teamsObject = {};
        teams.forEach(t => {
            teamsObject[t.name] = t;
        });

        return teamsObject;
    },
    objectToTeamArray(teamObject) {
        const teams = [];
        Object.keys(teamObject).forEach(k => {
            teams.push(teamObject[k]);
        });
        return teams;
    },
    scorers(team, lineup, goals) {
        const orderedRoster = team.roster.filter(p => lineup.indexOf(p.id) > -1).sort(byPlayerAbilityToScore);
        const possibleScorers = orderedRoster.filter(p => p.position !== 'GK' && !p.status.injured);
        const scorers = [];
        range(goals).forEach(() => {
            if (randomizer.chance(70)) {
                const {id, name, surname} = possibleScorers[randomizer.int(0, 3)];
                scorers.push({id, name, surname});
            } else {
                const {id, name, surname} = randomizer.pickOne(possibleScorers);
                scorers.push({id, name, surname});
            }
        });

        return scorers;
    },
    lineups(team) {
        const {coach, roster} = team;
        let module = extendedModules["4-4-2"];
        if (coach && coach.module) {
            module = extendedModules[coach.module];
        }
        let lineUps = [];
        module.roles.forEach((value, positionIndex) => {
            const position = positions[positionIndex];
            const newLineups = this.getPlayersByPosition(roster, position, value, lineUps);
            lineUps = lineUps.concat(newLineups);
        });
        return [...new Set(lineUps)];
    },
    getPlayersByPosition(roster, position, quantity = 1, excludeIds = []) {
        const lineups = [];
        roster = roster.filter(p => excludeIds.indexOf(p.id) === -1);
        for (let i = 0; i < quantity; i++) {
            roster = roster.filter(p => lineups.indexOf(p.id) === -1);
            let lineup = roster.filter(onlyPlayerPosition(position)).sort(byPlayerSkill)[0];
            if (!lineup) {
                lineup = randomizer.pickOne(roster);
            }
            lineups.push(lineup.id);
        }
        return lineups;
    },
    getPlayerById(team, id) {
        return team.roster.filter(p => p.id === id)[0];
    },
    averageSkill(team) {
        let avg = 0;
        if (team.roster && team.roster.length) {
            let tot = 0;
            team.roster.forEach(p => tot += p.skill);
            avg = tot / team.roster.length;
        }
        return Math.round(avg);
    },
    averageAge(team) {
        let avg = 0;
        if (team.roster && team.roster.length) {
            let tot = 0;
            team.roster.forEach(p => tot += p.age);
            avg = tot / team.roster.length;
        }
        return Math.round(avg);
    },
    updateStatus(team) {
        let morale = 0;
        if (team.roster && team.roster.length) {
            let tot = 0;
            team.roster.forEach(p => tot += p.status.morale);
            morale = Math.round(tot / team.roster.length);
        }
        return {
            ...team,
            status: {
                morale
            }
        }
    },
    isOffensive(team) {
        const module = team.coach ? team.coach.module : '4-4-2';
        return extendedModules[module].character === 1;
    },
    isDefensive(team) {
        const module = team.coach ? team.coach.module : '4-4-2';
        return extendedModules[module].character === 4;
    },
    canPlayModule(team) {
        const module = team.coach ? team.coach.module : '4-4-2';
        const roles = extendedModules[module].roles;
        const playersPerRole = this.playersPerRole(team);
        return roles.every((needed, index) => {
            return !(needed > 0 && !(playersPerRole[positions[index]] >= needed));
        });
    },
    playersPerRole(team) {
        const positionMapping = {};
        positions.forEach(p => positionMapping[p] = 0);
        team.roster.forEach(p => {
            positionMapping[p.position] += 1;
        });
        return positionMapping;
    },
    totalPlayersWage(team) {
        return team.roster.reduce((total, p) => total + p.wage, 0);
    },
    availableFunds(team) {
        return team.finance - teamHelper.totalPlayersWage(team) - (team.coach ? team.coach.wage : 0);
    }
};

export {teamHelper};