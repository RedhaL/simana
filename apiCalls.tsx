import axios, { AxiosRequestHeaders } from "axios";
import Router from "next/router";
import { ITask, Dispatch } from "./types";


export default function authHeader(): AxiosRequestHeaders {
    const saved = localStorage.getItem("token");
    var token = JSON.parse(saved ? saved : "")
  if (token) {
    // for Node.js Express back-end
    return { 'x-access-token': token };
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
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", JSON.stringify(res.data.token));

    console.log("login ok");
    Router.reload();
  } catch (err) {
    console.log("login failed");
  }
};

// Login via Google
export const googleCall = async () => {
  console.log("okio")

  try{
const res = await axios.get('http://localhost:8800/');
console.log("okio", res)
return res
  }catch(err){
    console.log(err)
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
export const teeeest = async () => {
  try {
    const res = await axios.get("http://localhost:8800/", {
      withCredentials: true
    });
    return res;
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
    const res = await axios.put("http://localhost:8800/api/tasks/", task, { headers: authHeader() });
    console.log("updating task ok :", res.data);
  } catch (err) {
    console.log("updating task failed", err);
  }
};

// Delete task in API
export const removeTask = async (task: ITask) => {
  try {
    const res = await axios.delete("http://localhost:8800/api/tasks/", { headers: authHeader(), data: task});
    console.log("updating task ok :", res.data);
  } catch (err) {
    console.log("updating task failed", err);
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
