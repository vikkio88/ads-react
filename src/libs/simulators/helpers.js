export const resultAppender = (status, {news, messages}) => {
    news && append('news', status, news);
    messages && append('messages', status, messages);
};

const append = (key, container, result) => {
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