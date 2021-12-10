import React, { createContext, useReducer, Dispatch, FC } from "react";
import calendarReducer from './reducers/calendar';
import { IDate, IAction } from '../types';
import { getTodayDate } from '../common/utils';

// Calendar context
const initialState: IDate = getTodayDate();

const useReducerWithMiddleware = (
    reducer: (state: IDate, action: IAction) => IDate,
    initialState: IDate
): [IDate, (middleWareFunc: () => IAction) => void] => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchWithMiddleware: (middleWareFunc: () => IAction) => void = (middleWareFunc) => {
        const action = middleWareFunc();
        dispatch(action);
    }
    return [state, dispatchWithMiddleware];
}

const Context = createContext<{
    state: IDate;
    //dispatch: Dispatch<IAction>;
    dispatch: (middleWareFunc: () => IAction) => void;
}>({
    state: initialState,
    dispatch: () => null
});

const AppProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducerWithMiddleware(calendarReducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </ Context.Provider>
    )
}

export { AppProvider, Context };