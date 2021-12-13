export interface IAction {
    type: string,
    data?: any
};

export interface IActionMapping {
    [actionName: string]: (IDate, IAction, dispatch: (action: IAction) => void) => void
};

export type PropsWithChildren<P> = P & { children?: ReactNode };

// Date types
export interface IDate {
    day: number,
    dayName: string,
    month: number,
    monthName: string,
    year: number,
};

export type CalendarStateType = IDate;

// Task types
export interface ITask {
    id: number,
    title: string,
    description: string,
    done: boolean,
    date: IDate,
    color: string
};

export type TaskStateType = ITask[];