import React, { CSSProperties } from "react";

// import * as electron from 'electron'

// electron.remote.app
const { remote } = window.require('electron');


// 存放文档的根目录
export const SAVE_LOCATION = remote.app.getPath('documents');


export interface IBaseProps {
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties
}



export interface IFile {
    id: string;
    title: string | undefined;
    body: string;
    createAt: number;
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
    Escape = 'Escape',
    Enter = 'Enter',
    s = 's',
    Meta = 'Meta'
}

export enum AlterMsgTypes {
    EmptyAlert = 'A file or folder name must be provided.',
    ExistedName = 'A file or folder name already exists at this location.',
    WhiteSpaceErr = 'Leading or trailing whitespace detected in file or folder name.',
    NullMsg = ''
}

export enum ActionTypes {
    NewFileFinished = 'newFileFinished',
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
    ActivedId = 'activedId',
    IsNewingFile = 'isNewingFile'
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
    editFile: (newValue: NewValuePayload) => void;
    saveFile: (id: IdPayload) => void;
    newFile: () => void;
    newFileFinished: (initName: string) => void;
    importFiles: () => void;
}

