import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table as STable} from 'semantic-ui-react';
import {leagueHelper} from "../../libs/helpers";
import {navigatePush} from "../../store/actions";


class TableView extends Component {
    teamDetails(teamName) {
        this.props.teamDetails(this.props.teamHash[teamName]);
    }

    render() {
        const {teams, league} = this.props;
        const tableTeams = leagueHelper.orderedTable(teams);
        if (!tableTeams.length) return <span/>;

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
                            tableTeams.map((t, index) => (
                                <STable.Row key={index} className="hoverableRow">
                                    <STable.Cell><strong>{index + 1}</strong></STable.Cell>
                                    <STable.Cell>
                                        <a className="navigationLink" onClick={() => this.teamDetails(t.name)}>
                                            {t.name}
                                        </a>
                                    </STable.Cell>
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


const stateToProps = ({game}) => {
    const teamHash = game.context.teams.hash;
    return {
        teamHash
    };
};
const dispatchToProps = dispatch => {
    return {
        teamDetails(team) {
            dispatch(navigatePush('teamDetails', team));
        }
    };
};
const Table = connect(stateToProps, dispatchToProps)(TableView);

export {Table};