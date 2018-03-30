export const markdownHelper = {
    results(results) {
        let parsed = `Match | Result\n`
            + `--- | ---\n`;
        results.forEach(r => {

            parsed += `${r.home} - ${r.away} | *${r.homeGoal} -${r.awayGoal}*\n`
        });
        return parsed;
    }
};