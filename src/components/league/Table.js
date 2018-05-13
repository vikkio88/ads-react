import React, {Component} from 'react';
import {Table as STable} from 'semantic-ui-react';
import {leagueHelper} from "../../libs/helpers";


class Table extends Component {
    render() {
        let {teams, league} = this.props;
        teams = leagueHelper.orderedTable(teams);
        if (!teams.length) return <span/>;

        return (
            <div>
                <h1>{`${league.name} ${league.season}`}</h1>
                <STable celled unstackable>
                    <STable.Header>
                        <STable.Row>
                            <STable.HeaderCell>#</STable.HeaderCell>
                            <STable.HeaderCell>Team</STable.HeaderCell>
                            <STable.HeaderCell>Points</STable.HeaderCell>
                            <STable.HeaderCell>Played</STable.HeaderCell>
                            <STable.HeaderCell>Won</STable.HeaderCell>
                            <STable.HeaderCell>Drawn</STable.HeaderCell>
                            <STable.HeaderCell>Lost</STable.HeaderCell>
                            <STable.HeaderCell>GS</STable.HeaderCell>
                            <STable.HeaderCell>GC</STable.HeaderCell>
                        </STable.Row>
                    </STable.Header>
                    <STable.Body>
                        {
                            teams.map((t, index) => (
                                <STable.Row key={index} className="hoverableRow">
                                    <STable.Cell><strong>{index + 1}</strong></STable.Cell>
                                    <STable.Cell>{t.name}</STable.Cell>
                                    <STable.Cell collapsing>{t.points}</STable.Cell>
                                    <STable.Cell>{t.played}</STable.Cell>
                                    <STable.Cell>{t.won}</STable.Cell>
                                    <STable.Cell>{t.draw}</STable.Cell>
                                    <STable.Cell>{t.lost}</STable.Cell>
                                    <STable.Cell>{t.goalsScored}</STable.Cell>
                                    <STable.Cell>{t.goalsConceded}</STable.Cell>
                                </STable.Row>
                            ))
                        }
                    </STable.Body>
                </STable>
            </div>
        );
    }
}

export {Table};