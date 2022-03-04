import { IAction, ICategory, CategoryState } from "../../types";

export default function CategoryReducer(state: CategoryState, action: IAction) {
    switch (action.type) {
        case 'ADD_CATEGORY':
            return [
                ...state,
                action.data.category
            ];
        case 'EDIT_CATEGORY':
            return state.map((el) => {
                if (action.data.category._id === el._id) {
                    return action.data.category
                }
                else {
                    return el;
                }
            })
        case 'DELETE_CATEGORY':
            return state.filter((el) => action.data.category._id !== el._id);
        default:
            throw new Error();
    }
}