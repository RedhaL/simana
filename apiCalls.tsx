import axios from "axios";
import Router from "next/router";
import { ITask, Dispatch } from "./types";

// Login
export const loginCall = async (userCredential: any) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      userCredential
    );
    localStorage.setItem("user", JSON.stringify(res.data));
    console.log("login ok :", res.data);
    Router.reload();
  } catch (err) {
    console.log("login failed");
  }
};

// Signup 
export const signupCall = async (user: any) => {
  try {
    const res = await axios.post("http://localhost:8800/api/auth/signup", user);
    localStorage.setItem("user", JSON.stringify(res.data));
    console.log("signup ok :", res.data);
    Router.reload();
  } catch (err) {
    console.log(err);
  }
};

// Add task to API
export const addTaskCall = async (task: ITask) => {
  try {
    const res = await axios.post("http://localhost:8800/api/tasks/", task);
    console.log("adding task ok :", res.data);
    const { createdAt, updatedAt, __v, ...filteredTask } = res.data;
    return filteredTask;
  } catch (err) {
    console.log("adding task failed");
  }
};

// Update task in API
export const updateTask = async (task: ITask) => {
  try {
    const res = await axios.put("http://localhost:8800/api/tasks/", task);
    console.log("updating task ok :", res.data);
    const { createdAt, updatedAt, __v, ...filteredTask } = res.data;
  } catch (err) {
    console.log("updating task failed");
  }
};

// Retrieve user tasks from API
export const TasksCall = async (
  userId: String,
  taskDispatch: Dispatch,
  retrieveTasks: Boolean,
  setRetrieveTasks: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res = await axios.get(
      "http://localhost:8800/api/tasks/all/" + userId
    );
    if (retrieveTasks == false) {
      res.data.forEach((e: ITask) => {
        taskDispatch({
          type: "RETRIEVE_TASKS",
          data: e,
        });
      });
      setRetrieveTasks(true);
    }
    return null;
  } catch (err) {
    console.log("retrieving user tasks failed");
  }
};
