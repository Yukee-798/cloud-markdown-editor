import { v4 as uuidv4 } from 'uuid';
import { IAction, IFile, ActionTypes, SAVE_LOCATION, IFileList } from '../types'
import { flattenFiles } from '../utils';
import { mockFiles } from '../utils/dev';

const path = window.require('path');


export interface IState {
    fileList: IFileList;

    openedFilesId: string[];
    unSavedFilesId: string[];
    activedId: string;
    isNewingFile: boolean;
}



const mockData = mockFiles(5);

const initState: IState = {
    fileList: flattenFiles(mockData),

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
                fileList: {
                    ...state.fileList,
                    [uuidv4()]: {
                        title: undefined,
                        id: uuidv4(),
                        body: '',
                        createAt: new Date().getTime(),
                        path: path.join(SAVE_LOCATION, '')
                    },
                }

                // fileList: [
                //     {
                //         title: undefined,
                //         id: uuidv4(),
                //         body: '',
                //         createAt: new Date().getTime(),
                //         path: path.join(SAVE_LOCATION, '')
                //     },
                //     ...state.fileList
                // ]
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
                fileList: {
                    ...state.fileList,
                    [payload.id]: {
                        ...state.fileList[payload.id],
                        body: payload.newValue
                    }
                }
                // fileList: [...state.fileList.map((file: IFile) => {
                //     if (file.id === payload.id) {
                //         return { ...file, body: payload.newValue };
                //     }
                //     return file;
                // })]
            };

        case ActionTypes.DeleteFile:


            delete state.fileList[payload];

            return {
                ...state,
                fileList: {
                    ...state.fileList
                },
                // fileList: state.fileList.filter((file: IFile) => file.id !== payload),
                isNewingFile: false
            };

        case ActionTypes.EditFileName:

            return {
                ...state,
                isNewingFile: false,
                fileList: {
                    ...state.fileList,
                    [payload.id]: {
                        ...state.fileList[payload.id],
                        title: payload.newName,
                        path: path.join(SAVE_LOCATION, payload.newName)
                    }
                }
                // fileList: state.fileList.map((file: IFile) => {
                //     if (file.id === payload.id) {
                //         return { ...file, title: payload.newName, path: path.join(SAVE_LOCATION, payload.newName) };
                //     }
                //     return file;
                // })
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