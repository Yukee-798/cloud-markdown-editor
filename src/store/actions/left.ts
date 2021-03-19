import { ActionTypes, IdPayload, NewFilePayload, NewNamePayload } from "../../types";



export type FileFilterCR = (payload: string) => {
    type: ActionTypes.FileFilter,
    payload: IdPayload
};

export type EditFileNameCR = (payload: NewNamePayload) => {
    type: ActionTypes.EditFileName,
    payload: NewNamePayload
}


export type DeleteFileCR = (payload: IdPayload) => {
    type: ActionTypes.DeleteFile,
    payload: IdPayload
}

export type FileSearchCR = () => {
    type: ActionTypes.FileSearch
}

export type ExitFileSearchCR = () => {
    type: ActionTypes.ExitFileSearch
}

export type OpenFileCR = (payload: IdPayload) => {
    type: ActionTypes.OpenFile,
    payload: IdPayload
}

export type NewFileCR = (payload: NewFilePayload) => {
    type: ActionTypes.NewFile,
    payload: NewFilePayload
}

/**
 * 
 * @param payload FileSearch InputValue
 * @returns action
 */
export const fileFilter: FileFilterCR = (payload: IdPayload) => ({ type: ActionTypes.FileFilter, payload });

export const editFileName: EditFileNameCR = (payload: NewNamePayload) => ({ type: ActionTypes.EditFileName, payload });
export const deleteFile: DeleteFileCR = (payload: IdPayload) => ({ type: ActionTypes.DeleteFile, payload });

export const fileSearch: FileSearchCR = () => ({ type: ActionTypes.FileSearch });
export const exitFileSearch: ExitFileSearchCR = () => ({ type: ActionTypes.ExitFileSearch });

export const openFile: OpenFileCR = (payload: IdPayload) => ({ type: ActionTypes.OpenFile, payload });

export const newFile: NewFileCR = (payload: NewFilePayload) => ({ type: ActionTypes.NewFile, payload });


// 暂时先不做
export const importFiles = () => ({ type: ActionTypes.ImportFiles })