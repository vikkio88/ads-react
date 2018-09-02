import React, {Component} from 'react';
import {Button, Menu} from "semantic-ui-react";
import {calendarHelper} from "../../libs/helpers";
import {Month} from "./Month";


class Calendar extends Component {
    constructor(props) {
        super(props);
        const {date, fixture, info} = this.props;
        const {months, currentMonth} = calendarHelper.getCalendarInfo(date, fixture, info);
        this.state = {
            currentMonth,
            months
        };
    }

    getNavigation(withMonth = true) {
        const {months, currentMonth} = this.state;
        const selectedMonth = months[currentMonth];
        return (
            <Menu>
                <Menu.Item position="left">
                    <Button
                        icon="angle left"
                        disabled={currentMonth === 0}
                        onClick={() => this.setState({currentMonth: currentMonth - 1})}
                    />
                </Menu.Item>
                {withMonth && <h2>{`${selectedMonth.name} ${selectedMonth.year}`}</h2>}
                <Menu.Item position="right">
                    <Button
                        icon="angle right"
                        disabled={currentMonth === months.length - 1}
                        onClick={() => this.setState({currentMonth: currentMonth + 1})}
                    />
                </Menu.Item>
            </Menu>
        );
    }

    render() {
        const {months, currentMonth} = this.state;
        const selectedMonth = months[currentMonth];
        return (
            <div>
                {this.getNavigation()}
                <Month days={selectedMonth.days} date={this.props.date}/>
                {this.getNavigation(false)}
            </div>
        );
    }
}


export {Calendar};
