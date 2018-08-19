import React, {Component} from 'react';
import {connect} from "react-redux";
import {SimpleList} from "../components/team";
import {Tab} from "semantic-ui-react";
import {Fixture, LeagueInfo} from "../components/league";


class DatabaseView extends Component {

    getTabs({teams, table, scorers, league, fixture}) {
        return [
            {
                menuItem: "League Tables", render: () => (
                    <Tab.Pane style={{overflowY: 'auto', whiteSpace: 'nowrap'}}>
                        <LeagueInfo league={league} table={table} scorers={scorers}/>
                    </Tab.Pane>
                )
            },
            {
                menuItem: "Calendar", render: () => (
                    <Tab.Pane style={{overflowY: 'auto', whiteSpace: 'nowrap'}}>
                        <Fixture fixture={fixture}/>
                    </Tab.Pane>
                )
            },
            {
                menuItem: "Teams", render: () => (
                    <Tab.Pane style={{overflowY: 'auto', whiteSpace: 'nowrap'}}>
                        <SimpleList teams={teams} detailed/>
                    </Tab.Pane>
                )
            }
        ];
    }

    render() {
        const {context} = this.props.game;
        const teams = (context.teams || {}).list || [];
        const table = (context.league || {}).table || [];
        const scorers = (context.league || {}).scorers || [];
        const {name, season, fixture} = context.league;
        const league = {
            name: name || '',
            season: season || ''
        };
        const tabs = this.getTabs({teams, table, scorers, league, fixture});
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
