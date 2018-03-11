import {randomizer} from '../generator/randomizer';

const MIN_MORALE = 0;
const MAX_MORALE = 100;

const PRICE_MULTIPLIER = 1000000;
const MIN_PRICE = 0.01;
const MIN_WAGE = 10000;

const playerHelper = {
    updateStatus(player, modifiers = {}) {
        let morale = player.status.morale;
        const {increases, decreases} = modifiers;

        if (increases && increases.length) {
            increases.forEach(mod => {
                morale = randomizer.chance(mod.chance) ? morale + mod.value : morale + 0;
            });
        }

        if (decreases && decreases.length) {
            decreases.forEach(mod => {
                morale = randomizer.chance(mod.chance) ? morale - mod.value : morale + 0;
            });
        }

        morale = morale < MIN_MORALE ? MIN_MORALE : morale;
        morale = morale > MAX_MORALE ? MAX_MORALE : morale;

        morale = Math.round(morale);
        return {
            ...player,
            status: {
                ...player.status,
                morale
            }
        }
    },
    calculateValue(player) {
        let price = this.basePriceOnSkill(player.skill);
        price = price * (1 + this.agePriceModifier(player.age));
        price += randomizer.int(1, 3);
        price -= randomizer.int(1, 3);

        //Strikers
        if (player.position === 'S') {
            price += randomizer.chance(player.skill) ? randomizer.int(1, 3) : 0;
        }

        if (price < 0) {
            price = MIN_PRICE;
        }
        price += (randomizer.int(0, 9) / 10);
        return Math.round(price * PRICE_MULTIPLIER);
    },
    basePriceOnSkill(skill) {
        if (skill > 98) return 130;
        if (skill > 90) return 80;
        if (skill > 80) return 50;
        if (skill > 76) return 20;
        if (skill > 70) return 10;
        if (skill > 60) return 5;
        if (skill > 50) return 2;
        return 0.5;
    },
    agePriceModifier(age) {
        if (age > 34) return -0.82;
        if (age > 32) return -0.54;
        if (age > 30) return -0.25;
        if (age > 28) return 0.235;
        if (age > 26) return 0.134;
        if (age > 22) return 0.21;
        if (age > 20) return -0.31;
        return 0.5;
    },
    calculateWage(player) {
        const {value, age} = player;
        const modifiedValue = value * (1 + this.agePriceModifier(age));
        let wage = Math.round(modifiedValue * (randomizer.int(1, 10) / 100));
        if (wage <= MIN_WAGE) {
            wage = (randomizer.int(8, 70) * 1000) + randomizer.int(100, 500);
        }
        return wage;
    },
    generateOffer(player) {
        const {value} = player;
        return value * (1 - randomizer.int(1, 30) / 100) +
            value * (1 + randomizer.int(1, 30) / 100);
    }
};

export {playerHelper};