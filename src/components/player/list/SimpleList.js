import React, {Component} from 'react';
import {Input, Rating, Table} from "semantic-ui-react";
import {extendedPositions} from "../../../const";
import {valueToRating} from "../../../libs/utils";
import {connect} from "react-redux";
import {navigatePush} from "../../../store/actions";
import {AdsFlag} from "../../common";

class SimpleListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            field: null,
            direction: null,
            roster: this.props.roster
        }
    }

    handleSort(clickedColumn) {
        let {roster, field, direction} = this.state;
        if (field !== clickedColumn) {
            roster = roster.sort((p, p2) => p[clickedColumn] >= p2[clickedColumn] ? 1 : -1);
            this.setState({
                roster,
                field: clickedColumn,
                direction: 'ascending'
            });
        } else {
            this.setState({
                roster: roster.reverse(),
                direction: direction === 'ascending' ? 'descending' : 'ascending'
            })
        }

    }

    getFilteredRoster() {
        const {filter, roster} = this.state;
        return !filter ? roster : roster.filter(t => t.surname.toLowerCase().indexOf(filter.toLowerCase()) > -1);
    }

    render() {
        const {roster, field, direction} = this.state;
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
                <Table celled padded unstackable sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={field === 'surname' ? direction : null}
                                onClick={() => this.handleSort('surname')}
                            >
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell>Nationality</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={field === 'age' ? direction : null}
                                onClick={() => this.handleSort('age')}
                            >
                                Age
                            </Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={field === 'skill' ? direction : null}
                                onClick={() => this.handleSort('skill')}
                            >
                                Skill
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredRoster.map(p => (
                            <Table.Row key={p.id} className='hoverableRow'>
                                <Table.Cell/>
                                <Table.Cell>
                                    <a onClick={() => this.props.playerDetails(p)} className="navigationLink">
                                        {`${p.name} ${p.surname}`}
                                    </a>
                                </Table.Cell>
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
