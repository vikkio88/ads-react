import React, {Component} from 'react';
import {connect} from "react-redux";
import {List} from "../components/messages";

class MailView extends Component {
    render() {
        return (
            <div>
                <h1>Messages</h1>
                <List messages={this.props.messages}/>
            </div>
        );
    }
}

const stateToProps = ({game}) => {
    const {messages} = game.status;
    return {
        messages
    };
};
const dispatchToProps = () => {
    return {};
};
const Mail = connect(stateToProps, dispatchToProps)(MailView);
export {Mail};
