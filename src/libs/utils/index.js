import numeral from 'numeral';
import {teamHelper} from "../helpers/teamHelper";
import {extendedPositions} from "../../const";

export const tableOrdering = field => {
    return (row1, row2) => row1[field] < row2[field] ? 1 : -1;
};
export const formatCurrency = (number, currency = '€') => `${numeral(number).format('(0.00 a)')} ${currency}`;

export const valueToRating = (value, max = 100, maxStart = 5) => value * maxStart / max;
export const percentageToColour = percentage => {
    const mapping = {
        80: 'green',
        69: 'olive',
        50: 'yellow',
        40: 'orange',
        0: 'red'
    };
    let colour = 'red';
    Object.keys(mapping).forEach(limit => {
        if (percentage > limit) {
            colour = mapping[limit];
        }
    });

    return colour;
};


// Teams
//ordering functions
export const byTeamSkillAvgDesc = (team, other) => {
    return teamHelper.averageSkill(team) <= teamHelper.averageSkill(other) ? 1 : -1;
};

// Players
//ordering functions
export const byPlayerAbilityToScore = (player, other) => {
    const playerPositionWeight = extendedPositions[player.position].weight;
    const otherPositionWeight = extendedPositions[other.position].weight;
    const playerMorale = player.status.morale;
    const otherMorale = other.status.morale;
    if (playerPositionWeight < otherPositionWeight) {
        return 1;
    }

    if (playerPositionWeight > otherPositionWeight) {
        return -1;
    }
    return playerMorale <= otherMorale ? 1 : -1;
};
export const byPlayerPosition = (player, other) => {
    return extendedPositions[player.position].weight <= extendedPositions[other.position].weight ? -1 : 1;
};