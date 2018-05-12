import {generator} from "../../../libs/generators";
import {teamHelper} from "../../../libs/helpers";

describe("Lineups", () => {
    it("selects correctly a lineup", () => {
        const teams = generator.teams(30);
        teams.forEach(team => {
            const lineups = teamHelper.lineups(team);
            expect(lineups.length).toBeGreaterThanOrEqual(11);
            expect([...new Set(lineups)].length).toBe(lineups.length);
        });
    });
});