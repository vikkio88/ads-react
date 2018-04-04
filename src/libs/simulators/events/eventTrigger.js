import conditions from "./conditions";

export default state => {
    const events = [];
    Object.keys(conditions).forEach(condition => {
        const triggered = conditions[condition](state);
        if (triggered) {
            events.push(triggered);
        }
    });

    return events;
};
