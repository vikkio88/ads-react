import React, {Component} from 'react';
import {Button, Icon, Rating, Table} from "semantic-ui-react";
import {extendedPositions} from "../../../const";
import {valueToRating} from "../../../libs/utils";
import {connect} from "react-redux";
import {navigatePush} from "../../../store/actions";
import {AdsFlag} from "../../common";

class SimpleListView extends Component {
    render() {
        const {roster} = this.props;
        if (!roster.length) {
            return <div/>;
        }
        return (
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
                    {roster.map(p => (
                        <Table.Row key={p.id}>
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
                                <Button onClick={() => this.props.playerDetails(p)}>
                                    <Icon name="magnify"/>
                                </Button>
                            </Table.Cell>
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
        playerDetails(player) {
            dispatch(navigatePush('playerDetails', player));
        }
    };
};
const SimpleList = connect(stateToProps, dispatchToProps)(SimpleListView);
export {SimpleList};