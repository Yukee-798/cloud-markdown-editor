import React, { CSSProperties } from "react";

export interface IBaseProps {
    className?: string;
    children?: React.ReactNode;
    style?:CSSProperties
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



export enum KeyTypes {
    Esc = 'Escape',
    Enter = 'Enter'
}