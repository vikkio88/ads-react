import React from 'react';
import {Segment} from "semantic-ui-react";
import {calendarHelper} from "../../libs/helpers";
import {Month} from "./Month";


const Calendar = ({date, fixtures}) => {
    const {months, currentMonth, currentDay} = calendarHelper.getCalendarInfo(date, fixtures);
    return (
        <Segment.Group>
            <Month {...months[currentMonth]} currentDay={currentDay}/>
        </Segment.Group>
    );
};

export {Calendar};
