import { IFile, ITab } from "../../types";
import { v4 as uuidv4 } from 'uuid';
export const mockFiles = (num: number) => {
    let files: IFile[] = [
        {
            id: uuidv4(),
            body: '123',
            title: 'Node.js',
            createAt: 1316415757916,
            // status: {
            //     isOpen: true,
            //     isUnsave: false,
            //     isActive: true
            // }
        },
        {
            id: uuidv4(),
            body: '456',
            title: 'Promise',
            createAt: 1216415757916,
            // status: {
            //     isOpen: false,
            //     isUnsave: true,
            //     isActive: false
            // }
        },
        {
            id: uuidv4(),
            body: '789',
            title: 'Node',
            createAt: 1416415757916,
            // status: {
            //     isOpen: true,
            //     isUnsave: false,
            //     isActive: false
            // }
        },
        {
            id: uuidv4(),
            body: '## webpack \n test  webpack  webpack webpack webpack webpack webpack webpack webpack webpack webpack webpack webpack',
            title: 'webpack',
            createAt: 1116415757916,
            // status: {
            //     isOpen: true,
            //     isUnsave: false,
            //     isActive: false
            // }
        },
        {
            id: uuidv4(),
            body: '## React.js \n test test testest testtest testtest testtest testtest testtest testtest testt testtest testtest testtest testtest testtest testtest testtest testtest testtest testtest test',
            title: 'React.js',
            createAt: 1016415757916,
            // status: {
            //     isOpen: true,
            //     isUnsave: false,
            //     isActive: false
            // }
        },
        {
            id: uuidv4(),
            body: '## Vue.js \n 12312 Vue vvvvvvvvvvvvsv test testtesttesttesttesttesttesttesttesttesttest',
            title: 'Vue.js',
            createAt: 1916415757916,
            // status: {
            //     isOpen: true,
            //     isUnsave: false,
            //     isActive: false
            // }
        },
        {
            id: uuidv4(),
            body: '## Next.js \n asd 1asd next 3412412e2next next next next next next next next next next next next next next next ',
            title: 'Next.js',
            createAt: 1216215747916,
            // status: {
            //     isOpen: true,
            //     isUnsave: false,
            //     isActive: false
            // }
        },
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

// export const mockTabs = (num: number) => {
//     let tabs: ITab[] = [];
//     for (let i = 0; i < num; i++) {
//         tabs.push({
//             id: i + '',
//             title: 'Node.js' + i,
//             body: 'hello world hello worldhello world hello world hello world hello world' + i,
//             createAt: 124124125122 + i,
//             tabStatus: 0
//         })
//     }
//     return tabs;
// }