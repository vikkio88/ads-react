import React, {Component} from 'react';
import {Grid} from "semantic-ui-react";
import {AppIcon} from "../components";

const apps = [
    {
        name: "mail",
        icon: "mail outline",
        label: "Mail"
    },
    {
        name: "news",
        icon: "newspaper",
        label: "News"
    },
    {
        name: "calendar",
        icon: "calendar outline",
        label: "Calendar"
    },
];


class Dashboard extends Component {

    renderApps() {
        return apps.map(a => <AppIcon key={a.label} {...a}/>);
    }

    render() {
        return (
            <Grid columns={3} doubling>
                {this.renderApps()}
            </Grid>
        );
    }
}

export {Dashboard};