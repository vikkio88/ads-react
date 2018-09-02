import React, {Component} from 'react';
import {Accordion, Icon, List,} from "semantic-ui-react";
import {DATE_FORMAT_DOW} from "../../const";

class Day extends Component {
    state = {
        active: false
    };

    render() {
        const {date, events, current = false} = this.props;
        const {active} = this.state;
        return (
            <Accordion styled fluid>
                <Accordion.Title
                    style={{
                        color: current ? 'red' : null
                    }}
                    onClick={events.length > 0 ? () => this.setState({active: !active}) : null}
                >
                    <span style={{fontSize: '1.5em'}}>{date.format(DATE_FORMAT_DOW)}</span>
                    {events.length > 0 && <Icon name="warning" color="red"/>}
                </Accordion.Title>
                <Accordion.Content active={active}>
                    <List>
                        {events.map((e, i) => <List.Item key={i} style={{fontSize: '1.5em'}}>{e}</List.Item>)}
                    </List>
                </Accordion.Content>
            </Accordion>
        );
    }
}

export {Day}
