import React, {Component} from 'react';
import {leagueHelper} from "../../libs/helpers";
import {Table} from "semantic-ui-react";
import {connect} from "react-redux";
import {navigatePush} from "../../store/actions";
import {Empty} from "../common";


class ScorersView extends Component {
    playerDetails(playerId) {
        const {teamHash, players} = this.props;
        this.props.playerDetails(
            teamHash[players[playerId]]
                .roster
                .filter(p => p.id === playerId)[0]
        );
    }

    render() {
        let {scorers} = this.props;
        scorers = leagueHelper.orderedScorers(scorers);
        if (!scorers.length) {
            return <Empty icon="users" text="No Scorers"/>;
        }
        scorers = scorers.slice(0, 15);

        return (
            <div>
                <h1>Scorers</h1>
                <Table celled unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Team</Table.HeaderCell>
                            <Table.HeaderCell>Goals</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            scorers.map((s, index) => (
                                <Table.Row key={index} className="hoverableRow">
                                    <Table.Cell><strong>{index + 1}</strong></Table.Cell>
                                    <Table.Cell>
                                        <a onClick={() => this.playerDetails(s.player.id)} className="navigationLink">
                                            {`${s.player.name} ${s.player.surname}`}
                                        </a>
                                    </Table.Cell>
                                    <Table.Cell>{s.team}</Table.Cell>
                                    <Table.Cell>{s.goals}</Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const stateToProps = ({game}) => {
    const {teams, players} = game.context;
    const teamHash = teams.hash;
    return {
        teamHash,
        players
    };
};
const dispatchToProps = dispatch => {
    return {
        playerDetails(player) {
            dispatch(navigatePush('playerDetails', player));
        }
    };
};
const Scorers = connect(stateToProps, dispatchToProps)(ScorersView);

export {Scorers}
