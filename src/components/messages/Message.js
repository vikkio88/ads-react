import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Segment} from "semantic-ui-react";
import {ValueLine} from "../common";

import './Message.css';

class MessageView extends Component {
    render() {
        const {message} = this.props;
        return (
            <Segment>
                <ValueLine.Group>
                    <ValueLine label="from" value={message.from}/>
                    <ValueLine label="date" value={message.date}/>
                    <ValueLine label="subject" value={message.subject}/>
                </ValueLine.Group>
                <Segment>
                    <div className="messageWrapper">
                        <p>
                            {message.message}
                        </p>
                    </div>
                </Segment>
            </Segment>
        );
    }
}

const stateToProps = ({navigation}) => {
    const {payload} = navigation;
    return {
        message: payload
    }
};
const dispatchToProps = dispatch => {
    return {};
};
const Message = connect(stateToProps, dispatchToProps)(MessageView);
export {Message};
