import React from 'react';
import {List, Segment} from "semantic-ui-react";

const Day = ({date, events, current = false}) => (
    <Segment inverted={current}>
        {date.format('dd')}
        <List>
            {events.map(e => <List.Item>{e}</List.Item>)}
        </List>
    </Segment>
);

export {Day}
