import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Segment} from "semantic-ui-react";
import {Badge} from "./misc/Badge";

class DetailsView extends Component {
    render() {
        const {team} = this.props;
        console.log(team);
        return (
            <Container fluid>
                <Segment.Group>
                    <Segment><Badge colours={team.colours}/><h1>{team.name}</h1></Segment>
                    <Segment.Group>
                        <Segment>
                            coach
                        </Segment>
                        <Segment>
                            roster
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