import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames'
import {Empty} from "../common";
import {List as SList, Icon, Button} from "semantic-ui-react";

import './List.css';
import {removeMessage, setAllMessagesAsRead, setMessageAsRead} from "../../store/actions/game";

class ListView extends Component {
    render() {
        const {messages, readAll, setAsRead, remove} = this.props;
        if (!messages || !messages.length) {
            return <Empty icon="mail" text="No Messages"/>;
        }
        return (
            <div>
                <div className="actions">
                    <div>
                        <Button icon="eye slash outline" onClick={() => readAll()}/>
                    </div>
                </div>
                <SList relaxed celled>
                    {
                        messages.map(m => (
                            <SList.Item key={m.id}>
                                <div className={classnames(['messageWrapper', {'toRead': !m.read}])}>
                                    <div className="icon">
                                        <Icon name={m.read ? 'envelope open' : 'envelope'} size="large"/>
                                    </div>
                                    <div className="from">{m.from}</div>
                                    <div className="subject">{m.subject}</div>
                                    <div className="date">{m.date}</div>
                                    <div className="preview">{m.message}</div>
                                    <div className="commandsWrapper">
                                        <Button size="mini" icon="trash" onClick={() => remove(m)}/>
                                        {!m.read && <Button size="mini" icon="eye slash outline" onClick={() => setAsRead(m)}/>}
                                    </div>
                                </div>
                            </SList.Item>
                        ))
                    }
                </SList>
            </div>
        );
    }
}


const stateToProps = () => {
    return {};
};
const dispatchToProps = dispatch => {
    return {
        setAsRead(message) {
            dispatch(setMessageAsRead(message));
        },
        remove(message) {
            dispatch(removeMessage(message));
        },
        readAll() {
            dispatch(setAllMessagesAsRead());
        }
    };
};
const List = connect(stateToProps, dispatchToProps)(ListView);
export {List};
