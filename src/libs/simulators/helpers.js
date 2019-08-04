import { teamHelper } from "../helpers";

export const resultAppender = (status, { news, messages }) => {
    news && append('news', status, news);
    messages && append('messages', status, messages);
};

export const formatResult = (status, context) => {
    const { hash } = context.teams;
    context.teams = {
        hash,
        list: teamHelper.objectToTeamArray(hash)
    }
};

const append = (key, container, result) => {
    if (result === null) {
        return;
    }
    
    if (Array.isArray(result)) {
        container[key] = [
            ...result,
            ...container[key]
        ];
    } else {
        container[key] = [
            result,
            ...container[key]
        ];
    }
};


