import {
  getPreviousWeek,
  getNextWeek,
  getCurrentWeekStart,
} from "../../common/utils";
import { CalendarState, IAction, ActionMapping, Dispatch } from "../../types";

const nextWeek = (
  state: CalendarState,
  action: IAction,
  dispatch: (action: IAction) => void
) => {
  const day = getNextWeek(state);
  dispatch({
    type: "NEXT_WEEK",
    data: day,
  });
};

const previousWeek = (
  state: CalendarState,
  action: IAction,
  dispatch: (action: IAction) => void
) => {
  const day = getPreviousWeek(state);
  dispatch({
    type: "PREVIOUS_WEEK",
    data: day,
  });
};

const goHome = (
  state: CalendarState,
  action: IAction,
  dispatch: (action: IAction) => void
) => {
  const day = getCurrentWeekStart();
  dispatch({
    type: "TODAY",
    data: day,
  });
};

const actionMapping: ActionMapping<CalendarState> = {
  NEXT_WEEK: nextWeek,
  PREVIOUS_WEEK: previousWeek,
  TODAY: goHome,
};
export default function calendarMiddleware(
  state: CalendarState,
  action: IAction,
  dispatch: Dispatch
): void {
  actionMapping[action.type](state, action, dispatch);
}
