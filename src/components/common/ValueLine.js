import React from 'react';
import {Segment} from "semantic-ui-react";

const ValueLine = ({label, value}) => (
    <Segment.Group horizontal>
        <Segment>
            <strong>{label}</strong>
        </Segment>
        <Segment>
            {`${value}`}
        </Segment>
    </Segment.Group>
);


export {ValueLine};