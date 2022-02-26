import React, { FC, useEffect } from "react";
import type { NextPage } from 'next';
import { IAction, CalendarState, TaskState } from '../types';
import { getCurrentWeekStart } from '../common/utils';
import { useReducerWithMiddleware } from '../store/context';
import calendarReducer from '../store/calendar/reducer';
import calendarMiddleware from "../store/calendar/actions";
import TaskReducer from '../store/tasks/reducer';
import taskMiddleware from "../store/tasks/actions";
import Layout from '../components/Layout';
import Calendar from '../components/Calendar';


const Planner: NextPage = () => {
    // calendar reducer
    const initialCalendarState: CalendarState = getCurrentWeekStart();
    const calendarMiddlewares = [calendarMiddleware];
    const [calendarStore, calendarDispatch] = useReducerWithMiddleware<CalendarState, IAction>(calendarReducer, initialCalendarState, calendarMiddlewares);
    
    //retrieving tasks from local storage
    var storedTasks: any = ""
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("tasks");
        storedTasks = JSON.parse(saved ? saved : "{}");
    } 

    // tasks reducer
    const taskMiddlewares = [taskMiddleware];
    const [taskStore, taskDispatch] = useReducerWithMiddleware<TaskState, IAction>(TaskReducer, storedTasks, taskMiddlewares);

    // storing tasks in local storage
    useEffect(() => {
        const isEmpty = Object.keys(taskStore).length === 0;
        !isEmpty ? localStorage.setItem("tasks", JSON.stringify(taskStore)) : null ;
      }, [taskStore]);
    

    return (
        <Layout pageTitle="Calendar" calendarDispatch={calendarDispatch}>
            <Calendar calendarStore={calendarStore} taskStore={taskStore} taskDispatch={taskDispatch} />
        </Layout>
    );
}

export default Planner;