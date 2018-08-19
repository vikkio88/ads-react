import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Progress, Rating, Segment, Icon, Menu} from "semantic-ui-react";
import {AdsFlag, ValueLine} from "../common";
import {extendedPositions} from "../../const";
import {formatCurrency, percentageToColour, valueToRating} from "../../libs/utils";

import './Details.css';

class DetailsView extends Component {
    render() {
        const {player, inPlayersTeam, lineups, scorers} = this.props;
        const rating = ((lineups[player.id] || {}).rating) ? ((lineups[player.id] || {}).rating).toFixed(2) : null;
        return (
            <Container fluid>
                <Segment>
                    <div className="nameTitleWrapper">
                        <div className="faceWrapper">
                            <Icon name="user" size="big" circular/>
                        </div>
                        <div className="nameWrapper">
                            <h1>{`${player.name} ${player.surname}`}</h1>
                            <AdsFlag name={player.nationality}/>
                        </div>
                    </div>
                    <ValueLine.Group>
                        <ValueLine label="Age" value={player.age}/>
                        <ValueLine label="Position" value={extendedPositions[player.position].description}/>
                        <ValueLine label="Value" value={formatCurrency(player.value)}/>
                        {!inPlayersTeam && (
                            <ValueLine
                                label={"Skill"}
                                value={(
                                    <Rating
                                        icon="star"
                                        disabled
                                        defaultRating={valueToRating(player.skill)}
                                        maxRating={5}
                                    />
                                )}
                            />)}

                        {inPlayersTeam && <ValueLine label={"Skill"} value={player.skill}/>}
                        {inPlayersTeam && (
                            <ValueLine
                                label={"Morale"}
                                value={(
                                    <Progress
                                        percent={player.status.morale}
                                        color={percentageToColour(player.status.morale)}
                                    />
                                )}
                            />
                        )}
                    </ValueLine.Group>
                </Segment>
                {lineups && (
                    <Segment>
                        <h2>Current Season</h2>
                        <ValueLine.Group>
                            <ValueLine label="Rate" value={rating || '-'}/>
                            <ValueLine label="Match played" value={(lineups[player.id] || {}).played || 0}/>
                            <ValueLine
                                label="Goal Scored"
                                value={(scorers[player.id] && scorers[player.id].goals) || 0}
                            />
                        </ValueLine.Group>
                    </Segment>
                )}
            </Container>
        )
    }
}

const stateToProps = ({navigation, game}) => {
    const {payload} = navigation;
    const {team, context} = game;
    const {lineups, scorers} = context.league;

    return {
        player: payload,
        inPlayersTeam: (payload.team && payload.text === team),
        lineups,
        scorers
    }
};
const dispatchToProps = () => {
    return {};
};
const Details = connect(stateToProps, dispatchToProps)(DetailsView);
export {Details};
