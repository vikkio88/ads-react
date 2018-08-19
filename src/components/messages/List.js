import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Empty} from "../common";

class ListView extends Component {
    render() {
        const {messages} = this.props;
        if (!messages.length) {
            return <Empty icon="mail" text="No Messages"/>;
        }
        return (
            <pre>
                {JSON.stringify(messages)}
            </pre>
        );
    }
}


const stateToProps = () => {
    return {};
};
const dispatchToProps = dispatch => {
    return {};
};
const List = connect(stateToProps, dispatchToProps)(ListView);
export {List};
