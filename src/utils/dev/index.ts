import { IFile, ITab } from "../../types";

export const mockFiles = (num: number) => {
    let files: IFile[] = [
        {
            id: '0',
            body: '123',
            title: 'Node.js',
            createAt: 1232142124124
        },
        {
            id: '1',
            body: '456',
            title: 'Promise',
            createAt: 1232142124124
        },
        {
            id: '2',
            body: '789',
            title: 'Node',
            createAt: 1232142124124
        },
        {
            id: '3',
            body: '0',
            title: 'webpack',
            createAt: 1232142124124
        }
    ];
    // for (let i = 0; i < num; i++) {
    //     files.push({
    //         id: i + '',
    //         title: 'Node.js' + i,
    //         body: 'hello world hello world hello worldhello world hello world hello world hello world' + i,
    //         createAt: 124124125122 + i
    //     })
    // }
    
    return files;
}

export const mockTabs = (num: number) => {
    let tabs: ITab[] = [];
    for (let i = 0; i < num; i++) {
        tabs.push({
            id: i + '',
            title: 'Node.js' + i,
            body: 'hello world hello worldhello world hello world hello world hello world' + i,
            createAt: 124124125122 + i,
            tabStatus: 0
        })
    }
    return tabs;
}