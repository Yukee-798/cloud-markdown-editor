import { v4 as uuidv4 } from 'uuid';
import { IAction, IFile, ActionTypes } from '../types'
import { mockFiles } from '../utils/dev';

export interface IState {
    fileList: IFile[];
    // 被过滤的 file id
    filterIds: string[];
    isFileSearch: boolean;

    openedFilesId: string[];
    unSavedFilesId: string[];
    activedId: string;
    isNewingFile: boolean;
}



const mockData = mockFiles(5);

const initState: IState = {
    fileList: mockData,
    filterIds: [],
    isFileSearch: false,

    openedFilesId: [],
    unSavedFilesId: [],
    activedId: '0',
    isNewingFile: false
}

export default function left(state: IState = initState, action: IAction): IState {
    const { type, payload } = action;
    switch (type) {

        case ActionTypes.NewFile:
            return {
                ...state,
                isNewingFile: true,
                fileList: [
                    {
                        title: undefined,
                        id: uuidv4(),
                        body: '',
                        createAt: new Date().getTime(),
                    },
                    ...state.fileList
                ]
            }

        case ActionTypes.UpdateActivedId:
            return {
                ...state,
                activedId: payload
            }

        case ActionTypes.OpenFile:
            return {
                ...state,
                openedFilesId: [...state.openedFilesId, payload]
            }

        case ActionTypes.CloseTab:

            return {
                ...state,
                openedFilesId: state.openedFilesId.filter((id) => id !== payload),
                unSavedFilesId: state.unSavedFilesId.filter((id) => id !== payload)
            }
        case ActionTypes.EditFile:
            return {
                ...state,
                unSavedFilesId: [...state.unSavedFilesId, payload.id],
                fileList: [...state.fileList.map((file: IFile) => {
                    if (file.id === payload.id) {
                        return { ...file, body: payload.newValue };
                    }
                    return file;
                })]
            };


        case ActionTypes.UpdateFilterIds:
            return {
                ...state,
                filterIds: [...payload]
            }

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
                fileList: state.fileList.filter((file: IFile) => file.id !== payload),
                isNewingFile: false
            };

        case ActionTypes.EditFileName:

            return {
                ...state,
                isNewingFile: false,
                fileList: state.fileList.map((file: IFile) => {
                    if (file.id === payload.id) {
                        return { ...file, title: payload.newName };
                    }
                    return file;
                })
            }

        // case ActionTypes.SaveFile:
        //     return {
        //         ...state,
        //         FileList: state.fileList.map((file: IFile) => {
        //             if (file.id === payload.id) {
        //                 return { ...file, body: payload.newValue };
        //             }
        //             return file;
        //         }),
        //         unSavedFilesId: state.unSavedFilesId.filter((id) => id !== payload.id)

        //     };


        default:
            return state;
    }
}