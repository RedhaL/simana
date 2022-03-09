import { TaskState, IAction, ActionMapping, Dispatch } from "../../types";
import { addTaskCall, removeTask, updateTask } from "../../apiCalls";

//   retrieving user from local storage
var localUser: any;
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("user");
  localUser = JSON.parse(saved ? saved : "{}");
}

const addTask = async (
  state: TaskState,
  action: IAction,
  dispatch: (action: IAction) => void
) => {
  action.data.task = await addTaskCall(action.data.task);
  dispatch(action);
};

const retrieveTasks = (
  state: TaskState,
  action: IAction,
  dispatch: (action: IAction) => void
) => {
  dispatch(action);
};

const deleteTask = async (
  state: TaskState,
  action: IAction,
  dispatch: (action: IAction) => void
) => {
  dispatch(action);
  await removeTask(action.data.task);
};

const editTask = async (
  state: TaskState,
  action: IAction,
  dispatch: (action: IAction) => void
) => {
  dispatch(action);
  action.data.task = await updateTask(action.data.task);
};

const actionMapping: ActionMapping<TaskState> = {
  ADD_TASK: addTask,
  RETRIEVE_TASKS: retrieveTasks,
  DELETE_TASK: deleteTask,
  EDIT_TASK: editTask,
};

export default function taskMiddleware(
  state: TaskState,
  action: IAction,
  dispatch: Dispatch
): void {
  if (actionMapping[action.type]) {
    actionMapping[action.type](state, action, dispatch);
  } else {
    dispatch(action);
  }
}
