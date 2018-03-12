import React, {Component} from 'react';
import {Button, Icon, Rating, Table} from "semantic-ui-react";
import {Badge} from "../";
import {teamHelper} from "../../../libs/helpers";
import {CURRENCY_MODIFIERS} from "../../../const";
import {valueToRating} from "../../../libs/utils";
import {connect} from "react-redux";
import {navigatePush} from "../../../store/actions";

class SimpleListView extends Component {
    render() {
        const {teams, detailed} = this.props;
        if (!teams.length) {
            return <div/>;
        }
        return (
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>#Players</Table.HeaderCell>
                        <Table.HeaderCell>Average Skill</Table.HeaderCell>
                        <Table.HeaderCell>Average Age</Table.HeaderCell>
                        <Table.HeaderCell>Finances</Table.HeaderCell>
                        {detailed && (<Table.HeaderCell>Details</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {teams.map(t => (
                        <Table.Row key={t.id}>
                            <Table.Cell>
                                <Badge colours={t.colours}/>
                            </Table.Cell>
                            <Table.Cell>{t.name}</Table.Cell>
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
                            {detailed && (
                                <Table.Cell>
                                    <Button onClick={() => this.props.teamDetails(t)}>
                                        <Icon name="magnify"/>
                                    </Button>
                                </Table.Cell>
                            )}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
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