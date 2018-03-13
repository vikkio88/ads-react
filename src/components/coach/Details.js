import React, {Component} from 'react';
import {connect} from "react-redux";

class DetailsView extends Component {
    render() {
        console.log(this.props.coach);
        return <h1>Coach</h1>
    }
}

const stateToProps = ({navigation}) => {
    const {payload} = navigation;
    return {
        coach: payload
    }
};
const dispatchToProps = () => {
    return {};
};
const Details = connect(stateToProps, dispatchToProps)(DetailsView);
export {Details};