import React, {Component} from 'react';
import {Grid} from "semantic-ui-react";
import {AppIcon} from "../components";

const apps = [
    {
        icon: "mail outline",
        label: "mail"
    },
    {
        icon: "newspaper",
        label: "news"
    },
    {
        icon: "calendar outline",
        label: "calendar"
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