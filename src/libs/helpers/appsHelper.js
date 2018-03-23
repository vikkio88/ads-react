const apps = [
    {
        name: "mail",
        icon: "mail outline",
        label: "Mail",
        notifications: 'messages'
    },
    {
        name: "news",
        icon: "newspaper",
        label: "News",
        notifications: 'news'
    },
    {
        name: "calendar",
        icon: "calendar outline",
        label: "Calendar"
    },
    {
        name: "database",
        icon: "database",
        label: "Database"
    },
];

export const getApps = notifications => {
    return apps.map(a => {
        return {
            ...a,
            notifications: notifications[a.notifications]
                ? notifications[a.notifications].length : 0
        }
    });
};