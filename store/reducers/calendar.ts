import { IDate, IAction } from "../../types";

export default function calendarReducer(state: IDate, action: IAction) {
    switch (action.type) {
        case 'NEXT_WEEK':
            return {
                ...state,
                date: state.date + 7
            };
        case 'PREVIOUS_WEEK':
            return state;
        case 'GOTO_WEEK':
            return state;
        case 'TODAY':
            return state;
        default:
            throw new Error();
    }
}