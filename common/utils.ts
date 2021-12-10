import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek"
import objectSupport from "dayjs/plugin/objectSupport"
import { IDate } from "../types";

dayjs.extend(isoWeek);
dayjs.extend(objectSupport);

// String manipulation
export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Date utility functions
export const getTodayDate = (): IDate => {
    const today = dayjs();
    return toIDateObject(today);
}

export const getCurrentWeekStart = (): IDate => {
    const start = dayjs().startOf('isoWeek');
    return toIDateObject(start);
}

export const getWeekStart = (date: IDate): IDate => {
    // const d = new Date(date.year, date.month, date.date);
    let dateObj = dayjs({
        year: date.yeak,
        month: date.month,
        day: date.date
    });
    dateObj = dateObj.startOf('isoWeek');
    return toIDateObject(dateObj);
}

export const getNextWeek = (date: IDate): IDate => {
    const current = dayjs(date);
    return toIDateObject(current.add(7, 'day'));
}

export const getPreviousWeek = (date: IDate): IDate => {
    const current = dayjs(date);
    return toIDateObject(current.subtract(7, 'day'));
}

export const getWeekDays = (date: IDate):IDate[] => {
    const days: IDate[] = [date];
    let current = dayjs(date);
    for (let i = 1; i < 6; i++) {
        current = current.add(1, 'day');
        days.push(toIDateObject(current));
    }
    return days;
}

const toIDateObject = (date: dayjs.Dayjs): IDate => {
    return {
        date: date.get('date'),
        month: date.get('month'),
        year: date.get('year')
    };
}