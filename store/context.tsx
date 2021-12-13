import React, { createContext, useReducer, FC } from "react";
import { IAction, CalendarStateType } from '../types';
import { getCurrentWeekStart } from '../common/utils';
import calendarReducer from './calendar/reducer';
import calendarMiddleware from "./calendar/actions";


// Calendar context
const initialState: CalendarStateType = getCurrentWeekStart();

const useReducerWithMiddleware = (
    reducer: (state: CalendarStateType, action: IAction) => CalendarStateType,
    initialState: CalendarStateType,
    middlewares?: ((state: CalendarStateType, action: IAction, dispatch: (action: IAction) => void) => void)[]
): [CalendarStateType, (action: IAction) => void] => {
    //create reducer
    const [state, dispatch] = useReducer(reducer, initialState);

    //return default dispatcher if no middlewares supplied
    if (!middlewares) {
        return [state, dispatch];
    }

    //call middleware functions
    const dispatchWithMiddleware: (action: IAction) => void = (action) => {
        middlewares.map((middleware) => {
            middleware(state, action, dispatch);
        });
    };
    return [state, dispatchWithMiddleware];
}


const Context = createContext<{
    state: CalendarStateType;
    dispatch: (action: IAction) => void;
}>({
    state: initialState,
    dispatch: () => null
});


const AppProvider: FC = ({ children }) => {
    const middlewares = [calendarMiddleware];
    const [state, dispatch] = useReducerWithMiddleware(calendarReducer, initialState, middlewares);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </ Context.Provider>
    )
}


export { AppProvider, Context };