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
import { deleteFile, editFileName, updateFilterIds, newFile, openFile } from '../../../store/actions/left';
import {difference} from '../../../utils/index'
import Fuse from 'fuse.js'
import './fileList.scss'

interface IMappedState {
    fileList: IFile[];
    filterIds: string[];
    isSearch: boolean;
}

interface IMappedAction {
    updateFilterIds: (ids: IdPayload[]) => void;
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
        isSearch,

        // action
        deleteFile,
        editFileName,
        searchKey,
        newFile,
        openFile,
        updateFilterIds,
        filterIds
    } = props;

    const editInputRef = useRef(new Input({ defaultValue: '' }));

    const [isEditTitle, setIsEditTitle] = useState(false);
    const [editedId, setEditedId] = useState('');
    // 表示fileList 正渲染的 list
    const [list, setList] = useState<IFile[]>([]);
    const isEsc = useKeyPress(KeyTypes.Esc);
    const isEnter = useKeyPress(KeyTypes.Enter);


    /**
     * 1. 点击编辑按钮后，将 ListItem 的 title 变成一个 Input
     * 2. Input 的默认值为 item.title 并且聚焦和选中了所有字符串
     * 3. Input 失去焦点后自动将 Input 的 value 设置给 item.title
     */


    useEffect(() => {
        if (searchKey !== undefined) {

            const option = {
                keys: ['title', 'body'],
                includeScore: true
            };
            const fuse = new Fuse(fileList, option);
            const res: string[] = fuse.search(searchKey).map(({item}) => {
                return item.id;
            })

            updateFilterIds(difference(fileList.map((file: IFile) => file.id), res));
            
        }
    }, [searchKey])


    const handleEditTitle = (file: IFile) => {
        setIsEditTitle(true);
        setEditedId(file.id);
    }


    const handleBlur = (file: IFile) => {
        setIsEditTitle(false);

        const input = editInputRef.current;

        // 失去焦点的时候 
        if (!(input.state.value === file.title) && window.confirm(`Rename to "${input.state.value}" ?`)) {
            editFileName({ id: file.id, newName: input.state.value });
        }
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
        // 处于编辑状态并且按下回车，则让 input 失去焦点
        if (isEnter && isEditTitle) {
            editInputRef.current.blur();
        }
    }, [isEnter])

    useEffect(() => {
        // 处于编辑状态并且按下按键，则退出编辑状态
        if (isEsc && isEditTitle) {
            setIsEditTitle(false)
        }
    }, [isEsc])



    useEffect(() => {
        setList(fileList.filter((file: IFile) => !filterIds.includes(file.id)));
    }, [filterIds, fileList]);

    useEffect(() => {
        if (!isSearch) {
            setList(fileList);
        }
    }, [isSearch])

    return (
        <div className='fileList-container'>
            <List
                className='fileList'
                dataSource={list}
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
                                        onBlur={() => { handleBlur(item) }}
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
    isSearch: state.left.isFileSearch,
    filterIds: state.left.filterIds
});

const mapDispatchToProps = (dispatch: Dispatch): IMappedAction => ({
    deleteFile: (id: IdPayload) => dispatch(deleteFile(id)),
    editFileName: (editedFile: NewNamePayload) => dispatch(editFileName(editedFile)),
    newFile: (initName: NewFilePayload) => dispatch(newFile(initName)),
    openFile: (id: IdPayload) => dispatch(openFile(id)),
    updateFilterIds: (ids: IdPayload[]) => dispatch(updateFilterIds(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileList);