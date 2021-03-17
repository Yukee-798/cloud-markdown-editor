import { IFile } from "../../types";

export const mookFiles = (num: number) => {
    let files: IFile[] = [];
    for (let i = num; i > 0; i--) {
        files.push({
            id: i,
            title: 'Node.js',
            body: 'hello world',
            createAt: 124124125122
        })
    }
    return files;
}