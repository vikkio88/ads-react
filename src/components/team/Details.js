import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Segment} from "semantic-ui-react";
import {Badge} from "./misc/Badge";
import {SimpleList} from "../player";
import {Details as CoachDetails} from "../coach";
import {AdsFlag} from "../common";

class DetailsView extends Component {
    render() {
        const {team} = this.props;
        let {coach} = team;
        coach = coach || {};
        return (
            <Container fluid>
                <Segment.Group>
                    <Segment>
                        <Badge colours={team.colours}/>
                        <h1><AdsFlag name={team.nationality}/> {team.name}</h1>
                    </Segment>
                    <Segment.Group>
                        <Segment>
                            <h2>Coach</h2>
                            {coach && <CoachDetails coach={coach}/>}
                            {!coach && <h1>-</h1>}
                        </Segment>
                        <Segment>
                            <h2>Roster</h2>
                            <SimpleList roster={team.roster}/>
                        </Segment>
                    </Segment.Group>
                </Segment.Group>
            </Container>
        );
    }
}

const stateToProps = ({navigation}) => {
    const {payload} = navigation;
    return {
        team: payload
    }
};
const dispatchToProps = () => {
    return {};
};
const Details = connect(stateToProps, dispatchToProps)(DetailsView);
export {Details};