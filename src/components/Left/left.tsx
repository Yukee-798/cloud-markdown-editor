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



import './left.scss'




interface IMappedState extends Pick<IState,
    StateTypes.IsNewingFile
> { }

interface IMappedDispatch extends Pick<IAllDispatch,
    ActionTypes.NewFile
> { }

interface ILeftProps extends IBaseProps, IMappedDispatch, IMappedState {

}
const Left: React.FC<ILeftProps> = (props) => {

    const [searchKey, setSearchKey] = useState<string>();
    const timerRef = useRef<any>();

    const {
        newFile,
        isNewingFile
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
        newFile();
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
                {/* 该按钮在被点击后会进入 isNewingFile 状态，此时按钮无法被点击，但是样式上还是存在 */}
                <Button
                    disabled={isNewingFile}
                    onClick={handleNewFile}
                    icon={<FontAwesomeIcon size='lg' icon={faFolderPlus} />}
                >
                    &emsp; New
                </Button>

                <Button
                    // disabled={isNewingFile}
                    onClick={handleImport}
                    icon={<FontAwesomeIcon size='lg' icon={faUpload} />}
                >
                    &emsp;Import
                </Button>
            </div>

        </div>
    )
}

const mapStateToProps = (state: IState): IMappedState => ({
    isNewingFile: state.isNewingFile
});
const mapDispatchToProps = (dispatch: Dispatch): IMappedDispatch => ({
    newFile: () => dispatch(newFile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Left);