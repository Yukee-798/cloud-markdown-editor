import { Card, Button } from 'antd';
import FileList from './FileList/fileList'

import { IBaseProps } from '../../types';
import FileSearch from './FileSearch/fileSearch';
import './style.scss'





const files: any[] = [
    {
        id: 1,
        title: 'Node.js',
        body: 'hello world',
        createAt: 124124125122

    },
    {
        id: 2,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 3,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 4,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
    {
        id: 5,
        title: 'React Hooks',
        body: 'hello !!!',
        createAt: 12412124128282
    },
]

const Left: React.FC<IBaseProps> = (props) => {

    const onKeySearch = () => {

    }
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <div className='left-container'>
            <Card
                title={
                    <FileSearch 
                        title='Cloud Document'
                        onKeySearch={onKeySearch}
                        // onChange={onChange}
                        placeholder='查找'
                    />
                }
            >
                <FileList 
                    files={files}

                />
            </Card>

            <div className='left-footer'>
                <Button>123</Button>
                <Button>123</Button>
            </div>

        </div>
    )
}

export default Left;