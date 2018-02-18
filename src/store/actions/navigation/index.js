export const NAVIGATE = 'navigate';

export const navigate = view => {
    console.log(view);
    return {
        type: NAVIGATE,
        data: {view}
    };
};