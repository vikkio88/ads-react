import {generator} from "../generators/generator";
import {ulid} from "ulid";

const NEWS_KEY = 'news';
export const newsGenerator = {
    generate(title, message, date, payload = {}) {
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