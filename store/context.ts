import { useReducer } from "react";

export function useReducerWithMiddleware<StateType, ActionType>(
  reducer: (state: StateType, action: ActionType) => StateType,
  initialState: StateType,
  middlewares?: ((
    state: StateType,
    action: ActionType,
    dispatch: (action: ActionType) => void
  ) => void)[]
): [StateType, (action: ActionType) => void] {
  //create reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  //return default dispatcher if no middlewares supplied
  if (!middlewares) {
    return [state, dispatch];
  }

  //call middleware functions
  const dispatchWithMiddleware: (action: ActionType) => void = (action) => {
    middlewares.map((middleware) => {
      middleware(state, action, dispatch);
    });
  };
  return [state, dispatchWithMiddleware];
}
