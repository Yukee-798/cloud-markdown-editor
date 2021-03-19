import { IAction, IFile, ActionTypes } from '../../types'
import { mockFiles } from '../../utils/dev';

export interface IState {
    fileList: IFile[];
    isFileSearch: boolean;
}


const mockData = mockFiles(5);

const initState: IState = {
    fileList: mockData,
    isFileSearch: false,
}

export default function left(state: IState = initState, action: IAction) {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.FileSearch:
            return {
                ...state,
                isFileSearch: true
            };

        case ActionTypes.ExitFileSearch:
            return {
                ...state,
                isFileSearch: false
            };

        case ActionTypes.DeleteFile:

            return {
                ...state,
                fileList: state.fileList.filter((file: IFile) => file.id !== payload)
            };

        case ActionTypes.EditFileName:

            return {
                ...state,
                fileList: state.fileList.map((file: IFile) => {
                    if (file.id === payload.id) {
                        return { ...file, title: payload.newName };
                    }
                    return file;
                })
            }

        case ActionTypes.SaveFile:
            return {
                ...state,
                FileList: state.fileList.map((file: IFile) => {
                    if (file.id === payload.id) {
                        return { ...file, body: payload.newValue };
                    }
                    return file;
                })
            };

        default:
            return state;
    }
}