import React, {Component} from 'react';
import {connect} from 'react-redux';

class MessageView extends Component {
    render() {
        const {message} = this.props;
        console.log(message);
        return (
            <pre>
                {JSON.stringify(message)}
            </pre>
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
