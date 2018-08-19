import React, {Component} from 'react';
import {Input, Table} from "semantic-ui-react";
import {connect} from "react-redux";
import {navigatePush} from "../../../store/actions";
import {AdsFlag} from "../../common";

class StatsListView extends Component {
    constructor(props) {
        super(props);
        let {roster, lineups, scorers} = this.props;
        roster = this.attachStatsToRoster(lineups, scorers, roster);
        this.state = {
            filter: '',
            field: null,
            direction: null,
            roster
        }
    }

    attachStatsToRoster(lineups, scorers, roster) {
        return roster.map(p => {
            return {
                ...p,
                played: lineups[p.id] ? lineups[p.id].played : 0,
                rating: lineups[p.id] ? lineups[p.id].rating : 0,
                goals: scorers[p.id] ? scorers[p.id].goals : 0
            }
        });
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
                            <Table.HeaderCell
                                sorted={field === 'surname' ? direction : null}
                                onClick={() => this.handleSort('surname')}
                            >
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={field === 'played' ? direction : null}
                                onClick={() => this.handleSort('played')}
                            >
                                Played
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={field === 'goals' ? direction : null}
                                onClick={() => this.handleSort('goals')}
                            >
                                Goals
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={field === 'rating' ? direction : null}
                                onClick={() => this.handleSort('rating')}
                            >
                                Rating
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredRoster.map(p => (
                            <Table.Row key={p.id} className='hoverableRow'>
                                <Table.Cell>
                                    <a onClick={() => this.props.playerDetails(p)} className="navigationLink">
                                        <AdsFlag name={p.nationality}/> {`${p.name} ${p.surname}`}
                                    </a>
                                </Table.Cell>
                                <Table.Cell>{p.played}</Table.Cell>
                                <Table.Cell>{p.goals}</Table.Cell>
                                <Table.Cell>{p.rating > 0 ? p.rating.toFixed(2) : '-'}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const stateToProps = ({game}) => {
    const {context} = game;
    const {lineups, scorers} = context.league;
    return {
        lineups,
        scorers
    };
};
const dispatchToProps = dispatch => {
    return {
        playerDetails(player) {
            dispatch(navigatePush('playerDetails', player));
        }
    };
};
const StatsList = connect(stateToProps, dispatchToProps)(StatsListView);
export {StatsList};
