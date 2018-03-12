export const NAVIGATE = 'navigate';
export const NAVIGATE_PUSH = 'navigate_push';
export const NAVIGATE_POP = 'navigate_pop';

export const navigate = (view, payload = {}) => {
    return {
        type: NAVIGATE,
        data: {view, payload}
    };
};

export const navigatePush = (view, payload = {}) => {
    return {
        type: NAVIGATE_PUSH,
        data: {
            view,
            payload
        }
    };
};

export const navigatePop = () => {
    return {
        type: NAVIGATE_POP
    };
};