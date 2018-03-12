import React, {Component} from 'react';
import {connect} from "react-redux";
import {SimpleList} from "../components/teams";

class DatabaseView extends Component {
    render() {
        const teams = ((this.props.game.context || {}).teams || {}).list || [];
        return <SimpleList teams={teams} detailed/>;
    }
}

const stateToProps = ({game}) => {
    return {
        game
    };
};
const dispatchToProps = () => {
    return {};
};
const Database = connect(stateToProps, dispatchToProps)(DatabaseView);
export {Database};