import {randomizer} from 'uvk';
import person from '../../config/providers/person';
import cities from '../../config/providers/cities';
import newspapers from '../../config/providers/newspapers';


const faker = {
    name(locale) {
        return randomizer.pickOne(person[locale].names);
    },
    surname(locale) {
        return randomizer.pickOne(person[locale].surnames);
    },
    city(locale) {
        return randomizer.pickOne(cities[locale].cities);
    },
    newspaper(locale) {
        return randomizer.pickOne(newspapers[locale].newspapers)
    }
};

export {faker};