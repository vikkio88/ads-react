import React, {Component} from 'react';
import {Button, Grid, Icon, Menu} from "semantic-ui-react";
import {AppIcon} from "../components";
import {connect} from "react-redux";
import {nextDay} from "../store/actions";
import {DATE_FORMAT} from "../const";

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


class DashboardView extends Component {

    renderApps(apps) {
        return apps.map(a => <AppIcon key={a.label} {...a}/>);
    }

    render() {
        const {nextDay, game} = this.props;
        const {player, date, messages, news} = game.status;
        const notifications = {messages, news};
        const applications = apps.map(a => {
            return {
                ...a,
                notifications: notifications[a.notification]
                    ? notifications[a.notification].length : 0
            }
        });
        return (
            <div>
                <div className="appView">
                    <Menu>
                        <Menu.Menu position="left">
                            <h2>{player && `${player.name} ${player.surname}`}</h2>
                        </Menu.Menu>
                        <Menu.Menu position="right">
                            <h2>{date && date.format(DATE_FORMAT)}</h2>
                        </Menu.Menu>
                    </Menu>
                    <Grid columns={3} doubling>
                        {this.renderApps(applications)}
                    </Grid>
                </div>
                <Menu secondary>
                    <Menu.Menu position="right">
                        <Button
                            fluid
                            size="massive"
                            onClick={() => nextDay(date)}
                        >
                            Next Day <Icon name="step forward"/>
                        </Button>
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

const stateToProps = ({game}) => {
    return {
        game
    };
};
const dispatchToProps = dispatch => {
    return {
        nextDay(date) {
            dispatch(nextDay(date));
        }
    };
};
const Dashboard = connect(stateToProps, dispatchToProps)(DashboardView);
export {Dashboard};