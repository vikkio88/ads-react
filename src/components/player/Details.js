import React, {Component} from 'react';
import {connect} from "react-redux";

class DetailsView extends Component {
    render() {
        console.log(this.props.player);
        return <h1>Player</h1>
    }
}

const stateToProps = ({navigation}) => {
    const {payload} = navigation;
    return {
        player: payload
    }
};
const dispatchToProps = () => {
    return {};
};
const Details = connect(stateToProps, dispatchToProps)(DetailsView);
export {Details};