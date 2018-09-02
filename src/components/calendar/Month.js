import React from 'react';
import {Day} from "./Day";

const Month = ({name, days, date}) => (
    <div>
        {days && days.map((day, index) => {
                return <Day key={`${name}_${index}`} {...day} current={date.isSame(day.date, 'day')}/>
            }
        )}
    </div>
);

export {Month}
