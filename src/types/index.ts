import React, { CSSProperties } from "react";
import { IState } from "../store/reducer";

export interface IBaseProps {
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties
}



export interface IFile {
    id: string;
    title: string;
    body: string;
    createAt: number;
    status: {
        isOpen: boolean;
        isUnsave: boolean;
        isActive: boolean;
    }
}


export interface ITab extends IFile {}


export interface IAction {
    type: ActionTypes;
    payload?: any;
}

export type IdPayload = string;

export type NewNamePayload = {
    id: string;
    newName: string;
}
export type NewValuePayload = {
    id: string;
    newValue: string;
}

export type NewFilePayload = IdPayload;


export enum KeyTypes {
    Esc = 'Escape',
    Enter = 'Enter'
}

export enum ActionTypes {
    UpdateActivedId = 'updateActivedId',
    CloseTab = 'closeTab',
    UpdateFilterIds = 'updateFilterIds', // 搜索过滤文件
    EditFileName = 'editFileName',
    DeleteFile = 'deleteFile',
    FileSearch = 'fileSearch', // 进入文件搜索状态
    ExitFileSearch = 'exitFileSearch', // 退出搜索状态
    NewFile = 'newFile', // 新建文件，涉及 nodejs 展示放着
    ImportFiles = 'importFiles', // 导入文件，涉及 nodejs 暂时放着

    OpenFile = 'openFile', // 参数传入 fileId，用于在点击左侧文件的 dispatch
    EditFile = 'editFile', // 编辑文件，传入文件 id
    SaveFile = 'saveFile', // 保存文件，传入文件 id 和 newValue
}

export enum StateTypes {
    FileList = 'fileList',
    FilterIds = 'filterIds',
    IsFileSearch = 'isFileSearch',
    OpenedFilesId = 'openedFilesId',
    UnSavedFilesId = 'unSavedFilesId',
    ActivedId = 'activedId'
}

export interface IAllDispatch {
    closeTab: (id: IdPayload) => void;
    updateActivedId: (id: IdPayload) => void;
    updateFilterIds: (ids: IdPayload[]) => void;
    deleteFile: (id: IdPayload) => void;
    editFileName: (editedFile: NewNamePayload) => void;
    openFile: (id: IdPayload) => void;
    fileSearch: () => void;
    exitFileSearch: () => void;

    // 暂时先不做
    editFile: (id: IdPayload) => void;
    saveFile: (newValue: NewValuePayload) => void;
    newFile: (initName: NewFilePayload) => void;
    importFiles: () => void;
}

