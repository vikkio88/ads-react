export const baseJob = {
    contractEnds: null,
    wage: null, // this should be in thousands
    board: 0,
    supporters: 0,
};

export const baseLeague = {
    table: [],
    fixture: [],
    scorers: {},
    lineups: {}
};

export const baseGameStatus = {
    player: null,
    job: null,
    team: null,
    messages: [],
    news: [],
    date: null,
    marketOpen: true,
    history: {
        seasons: [],
        player: []
    },
    // misc info
    // like team that are offering or players relationship
    misc: {
        teams: {
            /*
            'id' : { relationship: 50, offering: false}
            */
        },
        players: {
            /*
            'id' : { relationship: 50, offering: false}
            */
        },
    }
};


export const playerMatchStatBase = {
    played: 1,
    rating: 0
};


/*
    context: {
        teams: {
            hash: teamHelper.teamsToObject(teams),
            list: teams
        },
        players: teamHelper.extractPlayersMap(teams),
        league:
            {
                ...baseLeague,
                table:teamHelper.createCleanTable(teams),
            }
    }
*/
