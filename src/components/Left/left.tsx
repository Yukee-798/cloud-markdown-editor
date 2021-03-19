import { Card, Button } from 'antd';
import FileList from './FileList/fileList'
import {faFileUpload, faFolderPlus, faUpload} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { mockFiles } from '../../utils/dev';
import { IBaseProps } from '../../types';
import FileSearch from './FileSearch/fileSearch';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { useRef, useState } from 'react';

import './left.scss'






const files = mockFiles(5);



/**
 * 
 * 需求：
 * 1. 搜索框
 * 2. 文件树
 *      2.1 点击文件后，会在 tabList 中 append 一个
 *
 */
const Left: React.FC<IBaseProps> = () => {

    const [searchKey, setSearchKey] = useState<string>();
    const timerRef = useRef<any>();


    /**
     * 需求：
     *  1. 监听 value 的变化，如果前一次变化后超过 0.5s 未更新值，则把 searchKey 设置为该值
     *  
     */
    const onSearchChange = (value: string) => {

        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            setSearchKey(value);
        }, 500)
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
                    icon={<FontAwesomeIcon size='lg' icon={faFolderPlus}/>}
                >
                   &emsp; New
                </Button>

                <Button
                    icon={<FontAwesomeIcon size='lg' icon={faUpload}/>}
                >
                    &emsp;Import
                </Button>
            </div>

        </div>
    )
}

export default connect()(Left);