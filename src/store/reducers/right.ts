import { ActionTypes, IAction } from "../../types";

export interface IState {
    openedFilesId: string[];
    unSavedFilesId: string[];
}


const initState: IState = {
    openedFilesId: [],
    unSavedFilesId: []
}

export default function right(state: IState = initState , action: IAction) {
    const {type, payload} = action;
    switch (type) {
        case ActionTypes.EditFile:
            return {
                ...state,
                unSavedFilesId: [...state.unSavedFilesId, payload]
            };
        case ActionTypes.SaveFile:
            return {
                ...state,
                unSavedFilesId: state.unSavedFilesId.filter((id) => id !== payload.id)
            };
        default:
            return state;
    }
}