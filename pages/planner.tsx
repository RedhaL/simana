import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { IAction, CalendarState, TaskState, CategoryState } from "../types";
import { getCurrentWeekStart } from "../common/utils";
import { useReducerWithMiddleware } from "../store/context";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import calendarReducer from "../store/calendar/reducer";
import calendarMiddleware from "../store/calendar/actions";
import categoryReducer from "../store/categories/reducer";
import categoryMiddleware from "../store/categories/actions";
import TaskReducer from "../store/tasks/reducer";
import taskMiddleware from "../store/tasks/actions";
import Layout from "../components/Layout";
import TaskContainer from "../components/TaskContainer";
import { googleCall, TasksCall, teeeest } from "../apiCalls";

const Planner: NextPage = () => {
  const [retrieveTasks, setRetrieveTasks] = useState(false);

  //   retrieving user from local storage
  var localUser: any;
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("user");
    localUser = JSON.parse(saved ? saved : "{}");
  }

  // calendar reducer
  const initialCalendarState: CalendarState = getCurrentWeekStart();
  const calendarMiddlewares = [calendarMiddleware];
  const [calendarStore, calendarDispatch] = useReducerWithMiddleware<
    CalendarState,
    IAction
  >(calendarReducer, initialCalendarState, calendarMiddlewares);

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
  const [categoryStore, categoryDispatch] = useReducerWithMiddleware<
    CategoryState,
    IAction
  >(categoryReducer, initialCategoryState, categoryMiddlewares);

  // tasks reducer
  const taskMiddlewares = [taskMiddleware];
  const [taskStore, taskDispatch] = useReducerWithMiddleware<
    TaskState,
    IAction
  >(TaskReducer, {}, taskMiddlewares);

  useEffect(() => {
    TasksCall(localUser._id, taskDispatch, retrieveTasks, setRetrieveTasks);
    googleCall();
    teeeest();
  
  }, []);

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    taskDispatch({
      type: "MOVE_TASK",
      data: {
        source,
        destination,
      },
    });
  };

  return (
    <Layout pageTitle="Calendar" calendarDispatch={calendarDispatch}>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskContainer
          calendarStore={calendarStore}
          tasks={taskStore}
          taskDispatch={taskDispatch}
        />
        <TaskContainer
          categoryStore={categoryStore}
          tasks={taskStore}
          taskDispatch={taskDispatch}
        />
      </DragDropContext>
    </Layout>
  );
};

export default Planner;
