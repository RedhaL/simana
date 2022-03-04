import { getPreviousWeek, getNextWeek, getCurrentWeekStart } from '../../common/utils';
import { TaskState, IAction, ActionMapping, Dispatch } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const addTask = (state: TaskState, action: IAction, dispatch: (action: IAction) => void) => {
    const id = uuidv4();
    action.data.task.id = id;
    dispatch(action);
}

const actionMapping: ActionMapping<TaskState> = {
    'ADD_TASK': addTask,
}

export default function taskMiddleware(state: TaskState, action: IAction, dispatch: Dispatch): void {
    if (actionMapping[action.type]) {
        actionMapping[action.type](state, action, dispatch);
    } else {
        dispatch(action);
    }
}