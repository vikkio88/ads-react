import React, {Component} from 'react';
import {Button, Input, Rating, Table} from "semantic-ui-react";
import {extendedPositions} from "../../../const";
import {valueToRating} from "../../../libs/utils";
import {connect} from "react-redux";
import {navigatePush} from "../../../store/actions";
import {AdsFlag} from "../../common";

class SimpleListView extends Component {
    state = {
        filter: ''
    };

    getFilteredRoster() {
        const {roster} = this.props;
        const {filter} = this.state;
        return !filter ? roster : roster.filter(t => t.surname.toLowerCase().indexOf(filter.toLowerCase()) > -1);
    }

    render() {
        const {roster} = this.props;
        if (!roster.length) {
            return <div/>;
        }
        const filteredRoster = this.getFilteredRoster();
        return (
            <div>
                <Input
                    fluid
                    label={{icon: 'filter'}}
                    labelPosition='left corner'
                    placeholder='Filter Players by Surname...'
                    onChange={e => this.setState({filter: e.target.value})}
                />
                <Table celled padded unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Nationality</Table.HeaderCell>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                            <Table.HeaderCell>Skill</Table.HeaderCell>
                            <Table.HeaderCell>Details</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredRoster.map(p => (
                            <Table.Row key={p.id} className='hoverableRow'>
                                <Table.Cell/>
                                <Table.Cell>{`${p.name} ${p.surname}`}</Table.Cell>
                                <Table.Cell>
                                    <AdsFlag name={p.nationality}/>
                                </Table.Cell>
                                <Table.Cell>{p.age}</Table.Cell>
                                <Table.Cell>{extendedPositions[p.position].description}</Table.Cell>
                                <Table.Cell>
                                    <Rating
                                        icon="star"
                                        disabled
                                        defaultRating={valueToRating(p.skill)}
                                        maxRating={5}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        onClick={() => this.props.playerDetails(p)}
                                        icon="magnify"
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
        playerDetails(player) {
            dispatch(navigatePush('playerDetails', player));
        }
    };
};
const SimpleList = connect(stateToProps, dispatchToProps)(SimpleListView);
export {SimpleList};