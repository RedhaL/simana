import React, { FC, useContext } from 'react';
import DayColumn from './DayColumn'
import { InitialColumnSize } from '../common/constants'
import { Context } from '../store/context';
import { getWeekDays } from '../common/utils';

const Calendar: FC = (props) => {
    const { state, dispatch } = useContext(Context);
    const weekColumns = [];
    const days = getWeekDays(state);
    for (let i = 0; i < days.length; i++) {
        const element = days[i];
        weekColumns.push(<DayColumn
            date={element}
            key={i}
            size={i < 5 ? InitialColumnSize.Full : InitialColumnSize.Half}
        />)

    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-6 gap-3">
                {weekColumns.slice(0, 5)}
                <div>
                    {weekColumns.slice(-2)}
                </div>
            </div>
        </div>
    )
}

export default Calendar;