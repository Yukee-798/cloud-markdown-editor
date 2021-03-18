import { IFile, ITab } from "../../types";

export const mockFiles = (num: number) => {
    let files: IFile[] = [];
    for (let i = 0; i < num; i++) {
        files.push({
            id: i + '',
            title: 'Node.js' + i,
            body: 'hello world' + i,
            createAt: 124124125122 + i
        })
    }
    return files;
}

export const mockTabs = (num: number) => {
    let tabs: ITab[] = [];
    for (let i = 0; i < num; i++) {
        tabs.push({
            id: i + '',
            title: 'Node.js' + i,
            body: 'hello world' + i,
            createAt: 124124125122 + i,
            tabStatus: 0
        })
    }
    return tabs;
}