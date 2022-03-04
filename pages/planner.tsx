import React, { FC, useEffect } from "react";
import type { NextPage } from 'next';
import { IAction, CalendarState, TaskState, CategoryState } from '../types';
import { getCurrentWeekStart } from '../common/utils';
import { useReducerWithMiddleware } from '../store/context';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import calendarReducer from '../store/calendar/reducer';
import calendarMiddleware from "../store/calendar/actions";
import categoryReducer from '../store/categories/reducer';
import categoryMiddleware from "../store/categories/actions";
import TaskReducer from '../store/tasks/reducer';
import taskMiddleware from "../store/tasks/actions";
import Layout from '../components/Layout';
import TaskContainer from '../components/TaskContainer';


const Planner: NextPage = () => {
    // calendar reducer
    const initialCalendarState: CalendarState = getCurrentWeekStart();
    const calendarMiddlewares = [calendarMiddleware];
    const [calendarStore, calendarDispatch] = useReducerWithMiddleware<CalendarState, IAction>(calendarReducer, initialCalendarState, calendarMiddlewares);

    // calendar reducer
    const initialCategoryState: CategoryState = [
        { title: "Someday", _id: "Someday" },
        { title: "Movies", _id: "Movies" },
        { title: "Ideas", _id: "Ideas" },
        { title: "Groceries", _id: "Groceries" },
        { title: "Books", _id: "Books" },
        { title: "Other", _id: "Other" },
    ];
    const categoryMiddlewares = [categoryMiddleware];
    const [categoryStore, categoryDispatch] = useReducerWithMiddleware<CategoryState, IAction>(categoryReducer, initialCategoryState, categoryMiddlewares);

    //retrieving tasks from local storage
    var storedTasks: any = [];
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("tasks");
        if (saved)
            storedTasks = JSON.parse(saved);
    }

    // tasks reducer
    const taskMiddlewares = [taskMiddleware];
    const [taskStore, taskDispatch] = useReducerWithMiddleware<TaskState, IAction>(TaskReducer, storedTasks, taskMiddlewares);

    // storing tasks in local storage
    useEffect(() => {
        const isEmpty = Object.keys(taskStore).length === 0;
        !isEmpty ? localStorage.setItem("tasks", JSON.stringify(taskStore)) : null;
    }, [taskStore]);

    const onDragEnd = (result: DropResult): void => {
        console.log("ondragend result", result);
        const { source, destination } = result;

        if (!destination) {
            return;
        }
        taskDispatch({
            type: "MOVE_TASK",
            data: {
                source,
                destination
            },
        });
    };

    return (
        <Layout pageTitle="Calendar" calendarDispatch={calendarDispatch}>
            <DragDropContext onDragEnd={onDragEnd}>
                <TaskContainer calendarStore={calendarStore} tasks={taskStore} taskDispatch={taskDispatch} />
                <TaskContainer categoryStore={categoryStore} tasks={taskStore} taskDispatch={taskDispatch} />
            </DragDropContext>
        </Layout>
    );
}

export default Planner;