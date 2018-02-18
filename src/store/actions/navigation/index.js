export const NAVIGATE = 'navigate';

export const navigate = view => {
    return {
        type: NAVIGATE,
        data: {view}
    };
};