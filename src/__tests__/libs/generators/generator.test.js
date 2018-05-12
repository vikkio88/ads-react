import {generator} from "../../../libs/generators";

describe("Generator", () => {
    it("generates a set of teams with all player having unique ids", () => {
        const teams = generator.teams(10);
        let playerIds = [];
        const idMaps = {};
        teams.forEach(team => {
            playerIds = playerIds.concat(team.roster.map(p => p.id));
        });

        playerIds.forEach(id => {
            if (idMaps[id]) {
                idMaps[id]++;
            } else {
                idMaps[id] = 1;
            }
        });
        expect([...new Set(Object.values(idMaps))].length).toBe(1);
    });
});