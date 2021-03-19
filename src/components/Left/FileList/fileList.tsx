import { IBaseProps, IdPayload, IFile, KeyTypes, NewFilePayload, NewNamePayload } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import { Button, Input, List, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import useKeyPress from '../../../hooks/useKeyPress';
import { IRootState } from '../../../store/reducers/rootReducer';
import { deleteFile, editFileName, exitFileSearch, fileSearch, newFile, openFile } from '../../../store/actions/left';
import './fileList.scss'

interface IMappedState {
    fileList: IFile[];
    // isSearch: boolean;
}

interface IMappedAction {
    fileSearch: () => void;
    exitFileSearch: () => void;
    deleteFile: (id: IdPayload) => void;
    editFileName: (editedFile: NewNamePayload) => void;
    openFile: (id: IdPayload) => void;
    newFile: (initName: NewFilePayload) => void;
}


interface IFileListProps extends IBaseProps, IMappedAction, IMappedState {
    searchKey: string | undefined;
}

const FileList: React.FC<IFileListProps> = (props) => {



    const {
        // state
        fileList,

        // action
        deleteFile,
        editFileName,
        exitFileSearch,
        fileSearch,
        newFile,
        openFile,
    } = props;

    const editInputRef = useRef(new Input({ defaultValue: '' }));

    const [isEditTitle, setIsEditTitle] = useState(false);
    // const [fileList, setFileList] = useState<IFile[]>(files as IFile[]);
    const [editedId, setEditedId] = useState('');
    const isEsc = useKeyPress(KeyTypes.Esc);
    const isEnter = useKeyPress(KeyTypes.Enter);


    /**
     * 1. 点击编辑按钮后，将 ListItem 的 title 变成一个 Input
     * 2. Input 的默认值为 item.title 并且聚焦和选中了所有字符串
     * 3. Input 失去焦点后自动将 Input 的 value 设置给 item.title
     */

    const handleEditTitle = (file: IFile) => {
        setIsEditTitle(true);
        setEditedId(file.id);
    }


    const handleBlur = () => {
        setIsEditTitle(false);

        const input = editInputRef.current;

        // 失去焦点的时候 
        fileList.forEach((file: IFile) => {
            if (file.id === editedId) {
                if (!(input.state.value === file.title)) {
                    if (window.confirm(`Rename to "${input.state.value}" ?`)) {
                        editFileName({id: file.id, newName: input.state.value});
                    }
                }
            }
        })
    }

    const handleDelete = (file: IFile) => {
        if (window.confirm(`Are you sure to remove "${file.title}" ?`)) {
            deleteFile(file.id);
        }

    }

    useEffect(() => {
        if (isEditTitle) {
            const input = editInputRef.current;
            const value: string = input.state.value;
            input?.focus();
            input?.setSelectionRange(0, value.length);
        }
    }, [isEditTitle]);




    useEffect(() => {
        // 处于编辑状态并且按下按键，则退出编辑状态
        if (isEsc && isEditTitle) {
            setIsEditTitle(false)
        }
    }, [isEsc])


    return (
        <div className='fileList-container'>
            <List
                className='fileList'
                dataSource={fileList}
                renderItem={(item: IFile) => (
                    <List.Item
                        className='fileList-item'
                        key={item.id}
                        onClick={() => { }}
                    >
                        {/* <Link></Link> */}
                        <List.Item.Meta
                            avatar={<FontAwesomeIcon icon={faMarkdown} />}
                            title={
                                isEditTitle && item.id === editedId ?
                                    <Input
                                        ref={editInputRef}
                                        onBlur={handleBlur}
                                        defaultValue={item.title}
                                    /> : item.title
                            }
                            description={item.body.substring(0, 50)}
                        />

                        {
                            isEditTitle && item.id === editedId ?
                                <></> :
                                <>
                                    <Tooltip
                                        autoAdjustOverflow
                                        title='edit'
                                    >
                                        <Button
                                            icon={<FontAwesomeIcon icon={faEdit} />}
                                            onClick={() => { handleEditTitle(item) }}
                                        >
                                        </Button>

                                    </Tooltip>
                                    <Tooltip
                                        autoAdjustOverflow
                                        title='delete'
                                    >
                                        <Button
                                            icon={<FontAwesomeIcon icon={faTrashAlt} />}
                                            onClick={() => { handleDelete(item) }}
                                        >
                                        </Button>
                                    </Tooltip>
                                </>
                        }
                    </List.Item>
                )}

            />

        </div>
    )
}


const mapStateToProps = (state: IRootState): IMappedState => ({
    fileList: state.left.fileList,
    // isSearch: state.left.isFileSearch
});

const mapDispatchToProps = (dispatch: Dispatch): IMappedAction => ({
    fileSearch: () => dispatch(fileSearch()),
    deleteFile: (id: IdPayload) => dispatch(deleteFile(id)),
    editFileName: (editedFile: NewNamePayload) => dispatch(editFileName(editedFile)),
    exitFileSearch: () => dispatch(exitFileSearch()),
    newFile: (initName: NewFilePayload) => dispatch(newFile(initName)),
    openFile: (id: IdPayload) => dispatch(openFile(id))

});

export default connect(mapStateToProps, mapDispatchToProps)(FileList);