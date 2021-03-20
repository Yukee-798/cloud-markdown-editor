import {
    ActionTypes,
    IdPayload,
    NewFilePayload,
    NewNamePayload,
    NewValuePayload
} from "../types";


export const updateFilterIds = (payload: IdPayload[]) => ({ type: ActionTypes.UpdateFilterIds, payload });

export const editFileName = (payload: NewNamePayload) => ({ type: ActionTypes.EditFileName, payload });
export const deleteFile = (payload: IdPayload) => ({ type: ActionTypes.DeleteFile, payload });

export const fileSearch = () => ({ type: ActionTypes.FileSearch });
export const exitFileSearch = () => ({ type: ActionTypes.ExitFileSearch });

export const openFile = (payload: IdPayload) => ({ type: ActionTypes.OpenFile, payload });

export const newFile = (payload: NewFilePayload) => ({ type: ActionTypes.NewFile, payload });


// 暂时先不做
export const importFiles = () => ({ type: ActionTypes.ImportFiles })




export const editFile = (payload: IdPayload) => ({
    type: ActionTypes.EditFile,
    payload
});
export const saveFile = (payload: NewValuePayload) => ({
    type: ActionTypes.SaveFile,
    payload
});


// 如果关闭的 tab 在 unSavedFilesId 中，则需要弹窗询问，Do you want to save ...
// YES：同时在 unSavedFilesId 和 openedFilesId 移除该 tabId 并保存
// No：同时在 unSavedFilesId 和 openedFilesId 移除该 tabId 不需要保存
// Cancel：不做操作

// 如果关闭的 tab 不在 unSavedFilesId 中，则直接在 openedFilesId 移除该 tabId
export const closeTab = (payload: IdPayload) => ({
    type: ActionTypes.CloseTab,
    payload
})