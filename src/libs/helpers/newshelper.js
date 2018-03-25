import {generator} from "../generators/generator";

export const newsGenerator = {
    generate(title, message, date, payload = {}) {
        return {
            title,
            message,
            date,
            newspaper: generator.newspaper(),
            payload,
            read: false
        }
    }
};