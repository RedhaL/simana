import { IAction, ITask, TaskState } from "../../types";
import { DraggableLocation } from "react-beautiful-dnd";

export default function TaskReducer(state: TaskState, action: IAction) {
    switch (action.type) {
        case 'ADD_TASK':
            const newState = { ...state };
            if (!newState[action.data.timestamp]) {
                newState[action.data.timestamp] = [];
            }
            newState[action.data.timestamp] = [
                ...newState[action.data.timestamp],
                action.data
            ];
            return newState;
        case 'EDIT_TASK':
            return {
                ...state
            };
        case 'TOGGLE_DONE':
            const newDayState = state[action.data.task.timestamp].map((el, ind) => {
                if (ind == action.data.index) {
                    return {
                        ...action.data.task,
                        done: !action.data.task.done
                    };
                }
                else {
                    return el;
                }
            });
            return {
                ...state,
                [action.data.task.timestamp]: newDayState
            };
        case 'MOVE_TASK':
            const { source, destination } = action.data;
            const element = {
                ...state[action.data.source.droppableId][source.index],
                timestamp: parseInt(action.data.destination.droppableId)
            };
            const newSource = state[action.data.source.droppableId].filter((el, ind) => {
                return ind != source.index;
            });

            let newDestination: ITask[];
            if (source.droppableId == destination.droppableId) {
                newDestination = newSource;
            } else {
                // add check if empty week
                if (!state[action.data.destination.droppableId]) {
                    newDestination = [];
                }
                else {
                    newDestination = state[action.data.destination.droppableId].slice();
                }
            }
            
            newDestination.splice(destination.index, 0, element);
            return {
                ...state,
                [action.data.source.droppableId]: newSource,
                [action.data.destination.droppableId]: newDestination
            }
        case 'DELETE_TASK':
            const toDelete = state[action.data.task.timestamp].filter((el, ind) => {
                return ind != action.data.index;
            })
            return {
                ...state,
                [action.data.task.timestamp]: toDelete
            };
        default:
            throw new Error();
    }
}