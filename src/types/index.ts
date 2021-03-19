import React, { CSSProperties } from "react";

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

}


export interface ITab extends IFile {
    tabStatus: TabStatus;
}


export enum TabStatus {
    Actived = 1,
    Default = 0,
    UnSaved = -1
}


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
    FileFilter = 'fileFilter', // 搜索过滤文件
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