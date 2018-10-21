import React, {Component} from 'react';
import {connect} from 'react-redux';

class MessageView extends Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}

const stateToProps = () => {
    return {};
};
const dispatchToProps = dispatch => {
    return {
        action() {
            dispatch();
        }
    };
};
const Message = connect(stateToProps, dispatchToProps)(MessageView);
export {Message};
