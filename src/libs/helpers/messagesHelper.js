import {ulid} from "ulid";

export const MESSAGE_PAYLOAD_TYPES = {
    CONTRACT_OFFER: 'contract_offer'
};
const MESSAGE_KEY = 'message';

export const messageHelper = {
    setAsRead(message, list) {
        return list.map(m => {
            if (m.id === message.id) {
                m.read = true;
            }
            return m;
        });
    },
    setAllAsRead(list) {
        return list.map(m => {
            return {...m, read: true}
        });
    },
    remove(message, list) {
        return list.filter(m => m.id !== message.id);
    }
};

export const messageGenerator = {
    generate(subject, from, message, date, actions = null, type = null, payload = null, ttl = 0) {
        return {
            id: `${MESSAGE_KEY}${ulid()}`,
            subject,
            from,
            message,
            date,
            actions,
            type,
            payload,
            ttl,
            read: false,
            replied: false
        }
    }
};
