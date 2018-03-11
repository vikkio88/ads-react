import {randomizer} from '../generator/randomizer';

const PRICE_MULTIPLIER = 1000000;
const MIN_PRICE = 0.01;

const coachHelper = {
    basePriceOnSkill(skill){
        if (skill > 98) return 10;
        if (skill > 90) return 8;
        if (skill > 80) return 5;
        if (skill > 76) return 2;
        if (skill > 70) return 1;
        if (skill > 60) return 0.7;
        if (skill > 50) return 0.2;
        return 0.1;
    },
    agePriceModifier(age){
        if (age < 35) return 0.1;
        if (age > 56) return -0.1;
        return 0.18;
    },
    calculateWage(coach){
        let price = this.basePriceOnSkill(coach.skill);
        price *= (1 + this.agePriceModifier(coach.age));
        if (price < 0) {
            price = MIN_PRICE;
        }
        price += (randomizer.int(0, 9) / 10);
        return Math.round(price * PRICE_MULTIPLIER);
    }
};

export {coachHelper};