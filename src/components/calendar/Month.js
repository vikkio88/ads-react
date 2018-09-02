import React from 'react';
import {Day} from "./Day";

const Month = ({days, date}) => (
    <div>
        {days && days.map((day, index) => {
                return <Day key={index} {...day} current={date.isSame(day.date, 'day')}/>
            }
        )}
    </div>
);

export {Month}
