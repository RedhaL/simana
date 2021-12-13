import { getPreviousWeek, getNextWeek, getCurrentWeekStart } from '../../common/utils';
import { CalendarStateType, IAction, IActionMapping } from '../../types';

const nextWeek = (state: CalendarStateType, action: IAction, dispatch: (action: IAction) => void) => {
    const day = getNextWeek(state);
    console.log("day in action", day)
    dispatch({
        type: 'NEXT_WEEK',
        data: day
    });
}

const previousWeek = (state: CalendarStateType, action: IAction, dispatch: (action: IAction) => void) => {
    const day = getPreviousWeek(state);
    dispatch({
        type: 'PREVIOUS_WEEK',
        data: day
    });
}

const goHome = (state:CalendarStateType, action: IAction, dispatch:(action:IAction)=>void) => {
    const day = getCurrentWeekStart();
    dispatch({
        type: 'TODAY',
        data: day
    })
}

const actionMapping: IActionMapping = {
    'NEXT_WEEK': nextWeek,
    'PREVIOUS_WEEK': previousWeek,
    'TODAY': goHome
}
export default function calendarMiddleware(state: CalendarStateType, action: IAction, dispatch: (action: IAction) => void): void {
    actionMapping[action.type](state, action, dispatch);
}