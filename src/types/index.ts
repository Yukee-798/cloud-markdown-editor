import React, { CSSProperties } from "react";

export interface IBaseProps {
    className?: string;
    children?: React.ReactNode;
    style?:CSSProperties
}

export interface IFile {
    id: number;
    title: string;
    body: string;
    createAt: number;

}


export enum KeyTypes {
    Esc = 'Escape',
    Enter = 'Enter'
}