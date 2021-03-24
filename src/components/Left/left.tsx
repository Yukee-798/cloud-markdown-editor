import { Card, Button } from 'antd';
import FileList from './FileList/fileList'
import { faFolderPlus, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionTypes, IAllDispatch, IBaseProps, StateTypes } from '../../types';
import FileSearch from './FileSearch/fileSearch';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { useRef, useState } from 'react';
import { IState } from '../../store/reducer';
import { newFile } from '../../store/actions';

// import { remote } from 'electron'
// import { join } from 'path'
import {fileHelper} from '../../utils/index'

import './left.scss'


const {remote} = window.require('electron');
const {join} = window.require('path');

interface IMappedState {}

interface IMappedDispatch extends Pick<IAllDispatch, 
    ActionTypes.NewFile
>{}

interface ILeftProps extends IBaseProps, IMappedDispatch {

}
const Left: React.FC<ILeftProps> = (props) => {

    const [searchKey, setSearchKey] = useState<string>();
    const timerRef = useRef<any>();
    const savedLocation = remote.app.getPath('documents');    

    const {
        newFile
    } = props;


    /**
     * 需求：
     *  1. 监听 value 的变化，如果前一次变化后超过 0.5s 未更新值，则把 searchKey 设置为该值
     *  
     */
    const onSearchChange = (value: string) => {

        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            console.log(value);
            setSearchKey(value);
        }, 500)
    }

    const handleNewFile = () => {
        // 在 fileList 的头部插入新的 item 

        fileHelper.writeFile(join(savedLocation, '123.md'), '123')
        newFile('');
    }

    const handleImport = () => {

    }

    return (
        <div className='left-container'>
            <Card
                title={
                    <FileSearch
                        title='Cloud Document'
                        placeholder='查找'
                        onChange={onSearchChange}
                    />
                }
            >
                <FileList
                    searchKey={searchKey}
                />
            </Card>

            <div className='left-footer'>
                <Button
                    onClick={handleNewFile}
                    icon={<FontAwesomeIcon size='lg' icon={faFolderPlus} />}
                >
                    &emsp; New
                </Button>

                <Button
                    onClick={handleImport}
                    icon={<FontAwesomeIcon size='lg' icon={faUpload} />}
                >
                    &emsp;Import
                </Button>
            </div>

        </div>
    )
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch): IMappedDispatch => ({
    newFile: (name: string) => dispatch(newFile(name))
});

export default connect(mapDispatchToProps, mapDispatchToProps)(Left);