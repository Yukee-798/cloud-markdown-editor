import { ActionTypes } from "../../types";

/**
 * 
 * @param payload FileSearch InputValue
 * @returns action
 */
export const fileFilter = (payload: string) => ({type: ActionTypes.FileFilter, payload});

export const editFileName = (payload: {id: string, newName: string}) => ({type: ActionTypes.EditFileName, payload});
export const deleteFile = (payload: string) => ({type: ActionTypes.DeleteFile, payload});

export const fileSearch = () => ({type: ActionTypes.FileSearch});
export const exitFileSearch = () => ({type: ActionTypes.ExitFileSearch});

export const openFile = (payload: string) => ({type: ActionTypes.OpenFile, payload});


// 暂时先不做
export const newFile = () => ({type: ActionTypes.NewFile})
export const importFiles = () => ({type: ActionTypes.ImportFiles})