import {generator} from "../generators/generator";
import {ulid} from "ulid";

const NEWS_KEY = 'news';
export const NEWS_PAYLOAD_TYPES = {
    RESULT: 'result'
};

export const newsGenerator = {
    generate(title, message, date, payload = null) {
        return {
            id: `${NEWS_KEY}${ulid()}`,
            title,
            message,
            date,
            newspaper: generator.newspaper(),
            payload,
            read: false
        }
    }
};

export const newsHelper = {
    setAsRead(news, list) {
        return list.map(n => {
            if (n.id === news.id) {
                n.read = true;
            }
            return n;
        });
    },
    remove(news, list) {
        return list.filter(n => n.id !== news.id);
    }
};
