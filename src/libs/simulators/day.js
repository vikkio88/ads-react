export const day = {
    simulate(game) {
        let {status, context} = game;
        const tomorrow = status.date = status.date.add(1, 'days');
        status.messages.push({ciao:1});
        return {
            status: {
                ...status,
            },
            context: {
                ...context
            }
        };
    }
};