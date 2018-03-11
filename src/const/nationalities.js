const extendedNationalities = {
    'it': {
        name: 'Italy',
        flag: 'it',
        currency: '€'
    },
    'en': {
        name: 'England',
        flag: 'gb',
        currency: '£'
    },
    'ru': {
        name: 'Russia',
        flag: 'ru',
        currency: '€'
    },
    'es': {
        name: 'Spain',
        flag: 'es',
        currency: '€'
    },
    'de': {
        name: 'Germany',
        flag: 'de',
        currency: '€'
    },
    'tr': {
        name: 'Turkey',
        flag: 'tr',
        currency: '€'
    },
    'fr': {
        name: 'France',
        flag: 'fr',
        currency: '€'
    },
    'ja': {
        name: 'Japan',
        flag: 'jp',
        currency: '¥'
    },
    'nl': {
        name: 'Netherlands',
        flag: 'nl',
        currency: '€'
    },
    'cz': {
        name: 'Czech Republic',
        flag: 'cz',
        currency: '€'
    }

};

const nationalities = Object.keys(extendedNationalities).map(k => k);
const nationalitiesArray = Object.keys(extendedNationalities).map(k => extendedNationalities[k]);

export {extendedNationalities, nationalities, nationalitiesArray};