import {generator} from "../generators/generator";

export const newsGenerator = {
    generate(title, message, date) {
        return {
            title,
            message,
            date,
            newspaper: generator.newspaper(),
            read: false
        }
    }
};