import React from 'react';
import {connect} from "react-redux";
import {Calendar as CalendarComponent} from '../components/calendar';

const CalendarView = ({date, fixture, info}) => (<CalendarComponent date={date} fixture={fixture} info={info}/>);

const stateToProps = ({game}) => {
    const {status, context} = game;
    const {date} = status;
    const {fixture, name, season} = context.league;
    const info = {name, season};
    return {
        date,
        fixture,
        info
    };
};
const dispatchToProps = dispatch => {
    return {};
};
const Calendar = connect(stateToProps, dispatchToProps)(CalendarView);
export {Calendar};
