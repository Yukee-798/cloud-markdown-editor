import { Card, Button } from 'antd';
import FileList from './FileList/fileList'
import { mookFiles } from '../../utils/dev';
import { IBaseProps } from '../../types';
import FileSearch from './FileSearch/fileSearch';
import './style.scss'





const files = mookFiles(5);

const Left: React.FC<IBaseProps> = (props) => {

    const onKeySearch = () => {

    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    const onFileClick = () => {

    }

    const onFileDelete = () => {

    }

    const onFileEdit = () => {

    }

    const onTitleEdit = () => {

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
                    onFileClick={onFileClick}
                    onFileDelete={onFileDelete}
                    onTitleEdit={onTitleEdit}
                    onFileEdit={onFileEdit}
                />
            </Card>

            <div className='left-footer'>
                <Button>New</Button>
                <Button>Import</Button>
            </div>

        </div>
    )
}

export default Left;