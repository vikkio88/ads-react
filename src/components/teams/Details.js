import React, {Component} from 'react';
import {connect} from "react-redux";

class DetailsView extends Component {
    render() {
        console.log(this.props.team);
        return <h1>Team</h1>
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