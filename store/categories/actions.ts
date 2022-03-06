import { IAction, ActionMapping, Dispatch, CategoryState } from "../../types";
import { v4 as uuidv4 } from "uuid";

const addCategory = (
  state: CategoryState,
  action: IAction,
  dispatch: (action: IAction) => void
) => {
  const id = uuidv4();
  action.data.task.id = id;
  dispatch(action);
};

const actionMapping: ActionMapping<CategoryState> = {
  ADD_CATEGORY: addCategory,
};

export default function categoryMiddleware(
  state: CategoryState,
  action: IAction,
  dispatch: Dispatch
): void {
  if (actionMapping[action.type]) {
    actionMapping[action.type](state, action, dispatch);
  } else {
    dispatch(action);
  }
}
