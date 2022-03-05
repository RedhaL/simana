import { updateTask } from "../../apiCalls";
import { IAction, ITask, TaskState } from "../../types";

export default function TaskReducer(state: TaskState, action: IAction) {
  const field = "columnId";
  switch (action.type) {
    case "RETRIEVE_TASKS":
      const initState = { ...state };
      if (!initState[action.data[field]]) {
        initState[action.data[field]] = [];
      }
      initState[action.data[field]] = [
        ...initState[action.data[field]],
        action.data,
      ];
      return initState;

    case "ADD_TASK":
      const newState = { ...state };
      if (!newState[action.data.task[field]]) {
        newState[action.data.task[field]] = [];
      }
      newState[action.data.task[field]] = [
        ...newState[action.data.task[field]],
        action.data.task,
      ];
      return newState;
    case "EDIT_TASK":
      const newEditedState = state[action.data.task[field]].map((el, ind) => {
        if (ind == action.data.index) {
          return {
            ...action.data.task,
            title: action.data.task.title,
          };
        } else {
          return el;
        }
      });
      return {
        ...state,
        [action.data.task[field]]: newEditedState,
      };
    case "TOGGLE_DONE":
      const newDayState = state[action.data.task[field]].map((el, ind) => {
        if (ind == action.data.index) {
          return {
            ...action.data.task,
            done: !action.data.task.done,
          };
        } else {
          return el;
        }
      });
      return {
        ...state,
        [action.data.task[field]]: newDayState,
      };
    case "MOVE_TASK":
      const { source, destination } = action.data;
      const element = {
        ...state[action.data.source.droppableId][source.index],
        timestamp: parseInt(action.data.destination.droppableId),
        columnId: action.data.destination.droppableId,
      };

      const newSource = state[action.data.source.droppableId].filter(
        (el, ind) => {
          return ind != source.index;
        }
      );

      let newDestination: ITask[];
      if (source.droppableId == destination.droppableId) {
        newDestination = newSource;
      } else {
        // add check if empty week
        if (!state[action.data.destination.droppableId]) {
          newDestination = [];
        } else {
          newDestination = state[action.data.destination.droppableId].slice();
        }
      }
      const afterState: TaskState = {
        ...state,
        [action.data.source.droppableId]: newSource,
        [action.data.destination.droppableId]: newDestination,
      };
      newDestination.splice(destination.index, 0, element);
      afterState[action.data.source.droppableId].forEach(
        async (e: ITask) => await updateTask(e)
      );
      afterState[action.data.destination.droppableId].forEach(
        async (e: ITask) => await updateTask(e)
      );

      return afterState;

    case "DELETE_TASK":
      const toDelete = state[action.data.task[field]].filter((el, ind) => {
        return ind != action.data.index;
      });
      return {
        ...state,
        [action.data.task[field]]: toDelete,
      };
    default:
      throw new Error();
  }
}
