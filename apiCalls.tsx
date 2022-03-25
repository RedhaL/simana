import axios, { AxiosRequestHeaders } from "axios";
import Router from "next/router";
import { ITask, Dispatch } from "./types";

export default function authHeader(): AxiosRequestHeaders {
  const saved = localStorage.getItem("user");
  var localUser = JSON.parse(saved ? saved : "{}");
  if (localUser && localUser.token) {
    // for Node.js Express back-end
    return { "x-access-token": localUser.token };
  } else {
    return {};
  }
}

// Login
export const loginCall = async (userCredential: any) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      userCredential
    );
    const {
      createdAt,
      city,
      username,
      updatedAt,
      email,
      profilePicture,
      __v,
      password,
      ...filteredUser
    } = res.data;
    localStorage.setItem("user", JSON.stringify(filteredUser));
    console.log("login ok");
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
    const res = await axios.post("http://localhost:8800/api/tasks/", task, {
      headers: authHeader(),
    });
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
    const res = await axios.put("http://localhost:8800/api/tasks/", task, {
      headers: authHeader(),
    });
    console.log("updating task ok :", res.data);
    const { createdAt, updatedAt, __v, ...filteredTask } = res.data;
  } catch (err) {
    console.log("updating task failed");
  }
};

// Delete task in API
export const removeTask = async (task: ITask) => {
  try {
    const res = await axios.delete("http://localhost:8800/api/tasks/", {
      headers: authHeader(),
      data: task,
    });
    console.log("deleting task ok");
  } catch (err) {
    console.log("deleting task failed", err);
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
      "http://localhost:8800/api/tasks/all/" + userId,
      { headers: authHeader() }
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
