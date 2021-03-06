import { Card, Button } from 'antd';
import FileList from './FileList/fileList'
import { faFolderPlus, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionTypes, IAllDispatch, IBaseProps, IdPayload, IFile, NewNamePayload, StateTypes, KeyTypes } from '../../types';
import FileSearch from './FileSearch/fileSearch';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { IState } from '../../store/reducer';
import Fuse from 'fuse.js'
import { closeTab, deleteFile, editFileName, newFile, newFileFinished, openFile, saveFile, updateActivedId } from '../../store/actions';
import { recoverFiles } from '../../utils';
import useKeyPress from '../../utils/hooks/useKeyPress';
import './left.scss'

// const Store = window.require('electron-store');

// const store = new Store();

// store.set('key', 123);
// console.log(store.get('key'));



interface IMappedState extends Pick<IState,
    StateTypes.FileList |
    StateTypes.OpenedFilesId |
    StateTypes.ActivedId |
    StateTypes.IsNewingFile
> { }

interface IMappedDispatch extends Pick<IAllDispatch,
    ActionTypes.UpdateActivedId |
    ActionTypes.EditFileName |
    ActionTypes.DeleteFile |
    ActionTypes.NewFile |
    ActionTypes.NewFileFinished |
    ActionTypes.OpenFile
> { }

interface ILeftProps extends IBaseProps, IMappedDispatch, IMappedState { }



const Left: React.FC<ILeftProps> = (props) => {

    const {
        newFile,
        isNewingFile,
        activedId,
        deleteFile,
        editFileName,
        fileList,
        newFileFinished,
        openFile,
        openedFilesId,
        updateActivedId,
    } = props;


    const [searchKey, setSearchKey] = useState<string>();
    const [renameId, setRenameId] = useState<string>();
    const [list, setList] = useState<IFile[]>(recoverFiles(fileList));
    const [isFileSearch, setIsFileSearch] = useState(false);
    const isEsc = useKeyPress([KeyTypes.Escape]);
    const timerRef = useRef<any>();



    useEffect(() => {
        setList(recoverFiles(fileList));
    }, [fileList])


    useEffect(() => {
        if (isEsc) {
            setIsFileSearch(false);
        }
    }, [isEsc])

    /** ?????? value ?????????????????????????????????????????? 0.5s ????????????????????? searchKey ??????????????? */
    const onSearchChange = (value: string) => {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            setSearchKey(value);
        }, 500)
    }

    const handleNewFile = () => {
        // ??? fileList ????????????????????? item 
        // newFile();
    }


    const handleItemClick = (id: string) => {
        // console.log(id);
        openFile(id);
        updateActivedId(id);
    }

    /** ?????????????????????????????? item */
    const handleItemDelete = (id: string) => {
        if (window.confirm(`Are you sure to remove "${fileList[id].title}" ?`)) {
            deleteFile(id);
        }
    }

    /** ?????? renameId */
    const handleItemRename = (id: string) => {
        setRenameId(id);
    }

    /**
     * ??????????????????????????? item ???????????????????????????
     * esc?????????????????????
     * blur????????????????????????????????? xxx ???????????? xxx ?
     * enter????????????????????????
     * 
     */
    const handleExitRename = (trigger: 'esc' | 'blur' | 'enter', newValue: string, isValid?: boolean) => {
        if (trigger === 'esc') {
            console.log(123123123);
            setRenameId(undefined);
        } else if (trigger === 'blur') {
            // ????????????????????????????????????????????????????????????????????????????????????????????????
            if (fileList[renameId as string]?.title === newValue || !isValid) {
                setRenameId(undefined);
            } else if (window.confirm(`Rename to "${newValue}`) && isValid) {
                // ???????????????
                editFileName({ id: renameId as string, newName: newValue });
                setRenameId(undefined);
            }

        } else {
            if (isValid) {
                // ???????????????
                editFileName({ id: renameId as string, newName: newValue });
                setRenameId(undefined);
            }
        }
    }

    const handleImport = () => {

    }


    /** ?????? searchKey ???????????????????????? list ?????? */
    useEffect(() => {
        if (searchKey !== undefined) {

            if (searchKey !== '') {
                const option = {
                    keys: ['title', 'body'],
                    includeScore: true
                };
                const fuse = new Fuse(recoverFiles(fileList) as IFile[], option);

                // ???????????? itemId
                const res: string[] = fuse.search(searchKey).map(({ item }) => item.id);
                setList((pre) => (pre.filter((file) => res.includes(file.id))));
            } else {
                setList(recoverFiles(fileList))
            }

        }

    }, [searchKey]);

    return (
        <div className='left-container'>
            <Card
                title={
                    <FileSearch
                        title='Cloud Document'
                        placeholder='??????'
                        onChange={onSearchChange}
                        onClick={() => setIsFileSearch(!isFileSearch)}
                        isFileSearch={isFileSearch}
                    />
                }
            >
                <FileList
                    source={list}
                    onItemClick={handleItemClick}
                    onItemDelete={handleItemDelete}
                    onItemRename={handleItemRename}
                    onExitRename={handleExitRename}
                    renameId={renameId}
                />
            </Card>

            <div className='left-footer'>
                {/* ????????????????????????????????? isNewingFile ?????????????????????????????????????????????????????????????????? */}
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
    isNewingFile: state.isNewingFile,
    fileList: state.fileList,
    openedFilesId: state.openedFilesId,
    activedId: state.activedId,
});
const mapDispatchToProps = (dispatch: Dispatch): IMappedDispatch => ({

    deleteFile: (id: IdPayload) => dispatch(deleteFile(id)),
    editFileName: (editedFile: NewNamePayload) => dispatch(editFileName(editedFile)),
    newFile: () => dispatch(newFile()),
    newFileFinished: (initName: string) => dispatch(newFileFinished(initName)),
    openFile: (id: IdPayload) => dispatch(openFile(id)),
    updateActivedId: (id: IdPayload) => dispatch(updateActivedId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Left);