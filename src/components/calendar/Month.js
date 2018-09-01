import React from 'react';
import {Segment} from "semantic-ui-react";
import {Day} from "./Day";

const Month = ({name, year, days, currentDay}) => (
    <Segment>
        <h3>{`${name} ${year}`}</h3>
        {days && days.map((day, index) => <Day {...day} current={index === currentDay}/>)}
    </Segment>
);

export {Month}
