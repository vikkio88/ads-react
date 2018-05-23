import React, {Component} from 'react';
import {Input, Rating, Table} from "semantic-ui-react";
import {Badge} from "../";
import {teamHelper} from "../../../libs/helpers";
import {CURRENCY_MODIFIERS} from "../../../const";
import {valueToRating} from "../../../libs/utils";
import {connect} from "react-redux";
import {navigatePush} from "../../../store/actions";

class SimpleListView extends Component {
    state = {
        filter: ''
    };

    getFilteredTeams() {
        const {teams} = this.props;
        const {filter} = this.state;
        return !filter ? teams : teams.filter(t => t.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
    }

    render() {
        const {teams, detailed} = this.props;
        if (!teams.length) {
            return <div/>;
        }

        const filteredTeams = this.getFilteredTeams();
        return (
            <div>
                <Input
                    fluid
                    label={{icon: 'filter'}}
                    labelPosition='left corner'
                    placeholder='Filter Team by name...'
                    onChange={e => this.setState({filter: e.target.value})}
                />
                <Table celled padded unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>#Players</Table.HeaderCell>
                            <Table.HeaderCell>Average Skill</Table.HeaderCell>
                            <Table.HeaderCell>Average Age</Table.HeaderCell>
                            <Table.HeaderCell>Finances</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredTeams.map(t => (
                            <Table.Row key={t.id} className="hoverableRow">
                                <Table.Cell>
                                    <Badge colours={t.colours}/>
                                </Table.Cell>
                                <Table.Cell>
                                    {!detailed && t.name}
                                    {detailed && (
                                        <a
                                            className="navigationLink"
                                            onClick={() => this.props.teamDetails(t)}
                                        >
                                            {t.name}
                                        </a>
                                    )}
                                </Table.Cell>
                                <Table.Cell>{t.roster.length}</Table.Cell>
                                <Table.Cell>
                                    <Rating
                                        icon="star"
                                        disabled
                                        defaultRating={valueToRating(teamHelper.averageSkill(t))}
                                        maxRating={5}
                                    />
                                </Table.Cell>
                                <Table.Cell>{teamHelper.averageAge(t)}</Table.Cell>
                                <Table.Cell>
                                    <Rating
                                        icon="star"
                                        disabled
                                        defaultRating={valueToRating(t.finance / CURRENCY_MODIFIERS.MILLIONS)}
                                        maxRating={5}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const stateToProps = () => {
    return {}
};
const dispatchToProps = dispatch => {
    return {
        teamDetails(team) {
            dispatch(navigatePush('teamDetails', team));
        }
    };
};
const SimpleList = connect(stateToProps, dispatchToProps)(SimpleListView);
export {SimpleList};