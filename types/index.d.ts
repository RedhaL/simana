export interface IDate {
    date: number,
    month: number,
    year: number
}

export interface IAction {
    type: string,
    data?: any
}

export type PropsWithChildren<P> = P & { children?: ReactNode };