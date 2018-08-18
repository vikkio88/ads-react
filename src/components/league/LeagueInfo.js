import React, {Component} from 'react';
import {Tab} from 'semantic-ui-react';
import {Table} from "./Table";
import {Scorers} from "./Scorers";


class LeagueInfo extends Component {
    render() {
        const {league, table, scorers} = this.props;
        return (
            <Tab renderActiveOnly panes={[
                {
                    menuItem: 'League Table',
                    render: () => <Table league={league} teams={table}/>
                },
                {
                    menuItem: 'Scorers',
                    render: () => <Scorers scorers={scorers}/>
                }
            ]}
            />
        );
    }
}

export {LeagueInfo}
