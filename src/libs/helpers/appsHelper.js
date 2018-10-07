const apps = [
    {
        name: "mail",
        icon: "mail outline",
        label: "Mail",
        notifications: {
            name: 'messages',
            active: m => !m.read
        }
    },
    {
        name: "news",
        icon: "newspaper",
        label: "News",
        notifications: {
            name: 'news',
            active: n => !n.read
        }
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
    {
        name: "office",
        icon: "id card",
        label: "Office",
        needsJob: true
    },
    {
        name: "profile",
        icon: "user",
        label: "Profile"
    },
    {
        name: "info",
        icon: "info circle",
        label: "Info"
    },
];

export const getApps = (notifications, hired = false) => {
    const filteredApps = apps.filter(a => !a.needsJob || (a.needsJob && hired));
    return filteredApps.map(a => {
        if (!a.notifications) return a;
        const {name, active} = a.notifications;
        return {
            ...a,
            notifications: notifications[name]
                ? notifications[name].filter(active).length : 0
        }
    });
};
