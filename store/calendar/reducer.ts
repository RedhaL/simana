import { IAction, CalendarState } from "../../types";

export default function calendarReducer(state: CalendarState, action: IAction) {
  switch (action.type) {
    case "NEXT_WEEK":
      return {
        ...state,
        ...action.data,
      };
    case "PREVIOUS_WEEK":
      return {
        ...state,
        ...action.data,
      };
    case "GOTO_WEEK":
      return state;
    case "TODAY":
      return {
        ...state,
        ...action.data,
      };
      return state;
    default:
      throw new Error();
  }
}
