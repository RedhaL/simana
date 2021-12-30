export interface IAction {
    type: string,
    data?: any
};

export type Dispatch = (action: IAction) => void;

export interface ActionMapping<StateType> {
    [actionName: string]: (state: StateType, action: IAction, dispatch: Dispatch) => void
}

export type PropsWithChildren<P> = P & { children?: ReactNode };

// Date types
export interface IDate {
    day: number,
    dayName: string,
    month: number,
    monthName: string,
    year: number,
    timestamp: number
};

export type CalendarState = IDate;

// Task types
export interface ITask {
    id: string,
    title: string,
    description: string,
    done: boolean,
    timestamp: number,
    color: string
};

export interface TaskState {
    [day: number]: ITask[]
} ;