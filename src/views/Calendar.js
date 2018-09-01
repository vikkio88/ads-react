import React from 'react';
import connect from "react-redux/es/connect/connect";
import {Calendar as CalendarComponent} from '../components/calendar';

const CalendarView = ({date, fixture}) => (<CalendarComponent date={date} fixture={fixture}/>);

const stateToProps = ({game}) => {
    const {status, context} = game;
    const {date} = status;
    const {fixture} = context.league;
    console.log(fixture);
    return {
        date,
        fixture
    };
};
const dispatchToProps = dispatch => {
    return {};
};
const Calendar = connect(stateToProps, dispatchToProps)(CalendarView);
export {Calendar};
