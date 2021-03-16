import React from "react";

export interface IBaseProps {
    className?: string;
    children?: React.ReactNode;
}


export enum KeyTypes {
    Esc = 'Escape',
    Enter = 'Enter'
}