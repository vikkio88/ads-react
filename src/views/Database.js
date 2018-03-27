import React, {Component} from 'react';
import {connect} from "react-redux";
import {SimpleList} from "../components/team";
import {Tab} from "semantic-ui-react";
import {Panel} from "../components/league";


class DatabaseView extends Component {

    getTabs({teams, table, scorers}) {
        return [
            {
                menuItem: "Teams", render: () => (
                    <Tab.Pane>
                        <SimpleList teams={teams} detailed/>
                    </Tab.Pane>
                )
            },
            {
                menuItem: "League Tables", render: () => (
                    <Tab.Pane>
                        <Panel table={table} scorers={scorers}/>
                    </Tab.Pane>
                )
            },
            {menuItem: "League Calendar", render: () => <h1>League Calendar</h1>},
        ];
    }

    render() {
        const {context} = this.props.game;
        const teams = (context.teams || {}).list || [];
        const table = (context.league || {}).table || [];
        const scorers = (context.league || {}).scorers || [];
        console.log({table, scorers});
        const tabs = this.getTabs({teams, table, scorers});
        return <Tab menu={{pointing: true}} panes={tabs}/>;
    }
}

const stateToProps = ({game}) => {
    return {
        game
    };
};
const dispatchToProps = () => {
    return {};
};
const Database = connect(stateToProps, dispatchToProps)(DatabaseView);
export {Database};