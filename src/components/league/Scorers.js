import React, {Component} from 'react';
import {leagueHelper} from "../../libs/helpers";
import {Table} from "semantic-ui-react";


class Scorers extends Component {
    render() {
        let {scorers} = this.props;
        scorers = leagueHelper.orderedScorers(scorers);
        if (!scorers.length) {
            return <span/>;
        }
        scorers = scorers.slice(0, 15);

        return (
            <div>
                <h1>Scorers</h1>
                <Table celled>
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
                                <Table.Row key={index}>
                                    <Table.Cell><strong>{index + 1}</strong></Table.Cell>
                                    <Table.Cell>{`${s.player.name} ${s.player.surname}`}</Table.Cell>
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

export {Scorers}