import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Empty} from "../common";
import {List as SList, Icon, Button} from "semantic-ui-react";

import './List.css';

class ListView extends Component {
    render() {
        const {messages} = this.props;
        if (!messages || !messages.length) {
            return <Empty icon="mail" text="No Messages"/>;
        }
        return (
            <div>
                <div className="actions">
                    <div>
                        <Button icon="eye slash outline" onClick={() => console.log('all')}/>
                    </div>
                </div>
                <SList relaxed divided>
                    {
                        messages.map(m => (
                            <SList.Item key={m.id}>
                                <div className="messageWrapper">
                                    <div className="icon">
                                        <Icon name={m.read ? 'envelope open' : 'envelope'} size="large"/>
                                    </div>
                                    <div className="from">{m.from}</div>
                                    <div className="subject">{m.subject}</div>
                                    <div className="date">{m.date}</div>
                                    <div className="preview">{m.message}</div>
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
    return {};
};
const List = connect(stateToProps, dispatchToProps)(ListView);
export {List};
