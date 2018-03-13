import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Flag, Segment} from "semantic-ui-react";
import {ValueLine} from "../common";
import {extendedPositions} from "../../const";
import {formatCurrency} from "../../libs/utils";

class DetailsView extends Component {
    render() {
        const {player, inPlayersTeam} = this.props;
        console.log(player);
        return (
            <Container fluid>
                <Segment.Group>
                    <Flag name={player.nationality === 'en' ? 'gb' : player.nationality}/>
                    <h1>{`${player.name} ${player.surname}`}</h1>
                    <ValueLine.Group>
                        <ValueLine label="Age" value={player.age}/>
                        <ValueLine label="Position" value={extendedPositions[player.position].description}/>
                        <ValueLine label="Value" value={formatCurrency(player.value)}/>
                        {inPlayersTeam && <ValueLine label={"Morale"} value={player.status.morale}/>}
                    </ValueLine.Group>
                </Segment.Group>
            </Container>
        )
    }
}

const stateToProps = ({navigation, game}) => {
    const {payload} = navigation;
    const {team} = game;
    return {
        player: payload,
        inPlayersTeam: (payload.team && payload.text === team)
    }
};
const dispatchToProps = () => {
    return {};
};
const Details = connect(stateToProps, dispatchToProps)(DetailsView);
export {Details};