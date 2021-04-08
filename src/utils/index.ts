// import * as pfs from 'fs/promises';

// import * as path from 'path';
// import Store from 'electron-store';

import { IFile, IFileList } from "../types";

const pfs = window.require('fs').promises;



export const fileHelper = {
    readFile: (path: string) => {
        return pfs.readFile(path, { encoding: 'utf8' });
    },
    writeFile: (path: string, content: string) => {
        return pfs.writeFile(path, content, { encoding: 'utf8' });
    },
    renameFile: (path: string, newPath: string) => {
        return pfs.rename(path, newPath);
    },
    deleteFile: (path: string) => {
        return pfs.unlink(path);
    }
};


// 求两个集合的差集
export const difference = (bigArr: string[], smArr: string[]) => {
    const a = new Set(bigArr);
    const b = new Set(smArr);
    return Array.from(new Set(Array.from(a).filter((x => !b.has(x)))));
}


export const judgeSetEqual = (set1: Set<any>, set2: Set<any>) => {

    // console.log(set1, set2);

    for (const value of set1) {
        if (!set2.has(value)) {
            return false;
        }
    }

    for (const value of set2) {
        if (!set1.has(value)) {
            return false;
        }
    }

    return true;
}



export const flattenFiles = (files: IFile[]) => {
    return files.reduce((res, current) => {
        return { ...res, [current.id]: current }
    }, {});
}

export const recoverFiles = (files: IFileList) => {
    return Object.keys(files).map((id: string) => (files[id]));
}




