const SAVE_KEY = 'game';
export const saveGame = game => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(game));
};

export const loadGame = () => {
    return JSON.parse(localStorage.getItem(SAVE_KEY) || null);
};

export const deleteGame = () => {
    localStorage.removeItem(SAVE_KEY);
    window.location.reload();
};