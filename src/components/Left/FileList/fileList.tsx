import { ActionTypes, IBaseProps, IdPayload, IFile, IAllDispatch, KeyTypes, NewFilePayload, NewNamePayload, StateTypes, AlterMsgTypes } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import { Alert, Button, Input, List, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux'

import useKeyPress from '../../../utils/hooks/useKeyPress';
import { deleteFile, editFileName, newFile, openFile, updateActivedId, closeTab, newFileFinished, saveFile } from '../../../store/actions';
import { difference, recoverFiles } from '../../../utils/index'
import { IState } from '../../../store/reducer';
import './fileList.scss'


interface IFileListProps extends IBaseProps {

    /** 实际渲染的列表 */
    source?: IFile[];
    /** 处于重命名状态的 itemId，默认为 undefined 此时无处于重命名状态的 item */
    renameId?: string;
    /** 列表 item 被点击打开的回调，传入 id */
    onItemClick?: (id: string) => void;
    /** 列表 item 被点击删除的回调，传入 id */
    onItemDelete?: (id: string) => void;
    /** 列表 item 被点击重命名的回调，传入 id */
    onItemRename?: (id: string) => void;
    /** 退出重命名的回调，有 esc，blur，enter 三种情况触发退出重命名，并传入退出时的重命名值 */
    onExitRename?: (trigger: 'esc' | 'blur' | 'enter', newName: string, isValid?: boolean) => void;

}

const FileList: React.FC<IFileListProps> = (props) => {
    const {
        source,
        renameId,
        onExitRename,
        onItemClick,
        onItemDelete,
        onItemRename
    } = props;


    const editInputRef = useRef(new Input({ defaultValue: '' }));
    const isEsc = useKeyPress([KeyTypes.Escape]);
    const isEnter = useKeyPress([KeyTypes.Enter]);

    const [isAlert, setIsAlter] = useState(false);
    const [alertMsg, setAlertMsg] = useState<AlterMsgTypes>(AlterMsgTypes.NullMsg);


    /** 判断重命名的时输入的 value 是否已经存在 */
    const judgeIsExisted = (value: string) => {
        return source?.filter((item) => (item.id !== renameId))
        .map((item) => (item.title))
        .includes(value);
    }

    /** 验证重命名时的输入是否有效 */
    const validateListen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (value === '') {
            setIsAlter(true);
            setAlertMsg(AlterMsgTypes.EmptyAlert);
        } else if (judgeIsExisted(value)) {
            setIsAlter(true);
            setAlertMsg(AlterMsgTypes.ExistedName);

        } else {
            setIsAlter(false);
            setAlertMsg(AlterMsgTypes.NullMsg);
        }
    }

    /** 当没有 item 处于重命名状态的时候设置为空 msg */
    useEffect(() => {
        if (renameId === undefined) {
            setIsAlter(false);
            setAlertMsg(AlterMsgTypes.NullMsg);
        }
    }, [renameId])

    /** 监听是否触发 enter 和 esc 两种退出重命名状态的情况 */
    useEffect(() => {
        const newValue = editInputRef?.current?.state.value;
        // 如果按下了 enter 之前验证逻辑处于 alter 状态则 enter 无效
        if (renameId && isEnter) {

            onExitRename?.('enter', newValue, !isAlert);
        } else if (renameId && isEsc) {
            
            onExitRename?.('esc', newValue);
        }
    }, [isEnter, isEsc])


    /** 当 list 中不存在 renameId 的时候抛出异常 */
    useEffect(() => {
        if (renameId) {
            if (!source?.map((file) => (file.id)).includes(renameId)) {
                throw 'The renameId can\'t match the list itemId.'
            }
        }
    }, [])


    /** 监听 item 是否处于 rename 状态，如果是则让 input 自动聚焦并且选中里面的文字 */
    useEffect(() => {
        if (renameId) {
            const input = editInputRef.current;
            const value: string = input.state.value;
            input?.focus();
            input?.setSelectionRange(0, value?.length);
        }
    }, [renameId]);


    return (
        <div className='fileList-container'>
            <List
                className='fileList'
                locale={{
                    emptyText:
                        <div className="ant-list-empty-text">
                            <div className="ant-empty ant-empty-normal">
                                <div className="ant-empty-image">
                                    <svg className="ant-empty-img-simple" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                                            <ellipse className="ant-empty-img-simple-ellipse" cx="32" cy="33" rx="32" ry="7">
                                            </ellipse>
                                            <g className="ant-empty-img-simple-g" fillRule="nonzero">
                                                <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z">
                                                </path>
                                                <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" className="ant-empty-img-simple-path">
                                                </path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div className="ant-empty-description">
                                    No files found. You can press <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Esc</span> or click <span style={{ fontSize: '20px', fontWeight: 'bold' }}>x</span> to exit search status.
                            </div>
                            </div>
                        </div>
                }}

                dataSource={source}
                renderItem={(item: IFile) => (
                    <List.Item
                        className='fileList-item'
                        key={item.id}
                        onClick={() => { onItemClick?.(item.id) }}
                    >
                        <List.Item.Meta
                            avatar={<FontAwesomeIcon icon={faMarkdown} />}
                            title={
                                renameId && item.id === renameId ?
                                    <div className='list-item-meta-title-warp'>
                                        <Input
                                            onClick={(e) => { e.stopPropagation() }}
                                            ref={editInputRef}
                                            onBlur={() => {
                                                onExitRename?.('blur', editInputRef.current.state.value, !isAlert)
                                            }}
                                            defaultValue={item.title}
                                            onChange={validateListen}
                                        />
                                        <Alert
                                            style={{ display: isAlert ? 'block' : 'none' }}
                                            message={alertMsg}
                                            type='warning'

                                        />
                                    </div>
                                    : item.title
                            }
                            // description={item.body.substring(0, 50)}
                            description={item.body.substring(0, 50)}
                        />

                        {
                            renameId && item.id === renameId ?
                                <></> :
                                <>
                                    <Tooltip
                                        autoAdjustOverflow
                                        title='edit'
                                    >
                                        <Button
                                            icon={<FontAwesomeIcon icon={faEdit} />}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onItemRename?.(item.id);
                                            }}
                                        >
                                        </Button>

                                    </Tooltip>


                                    <Tooltip
                                        autoAdjustOverflow
                                        title='delete'
                                    >
                                        <Button
                                            icon={<FontAwesomeIcon icon={faTrashAlt} />}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onItemDelete?.(item.id);
                                            }}
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




    // const {

    //     // props
    //     searchKey,

    //     // state
    //     fileList,
    //     isFileSearch,
    //     filterIds,
    //     openedFilesId,
    //     isNewingFile,
    //     activedId,


    //     // action
    //     updateActivedId,
    //     editFileName,
    //     deleteFile,
    //     openFile,
    //     updateFilterIds,
    //     closeTab,
    //     newFileFinished
    // } = props;

    // const editInputRef = useRef(new Input({ defaultValue: '' }));

    // const [isEditTitle, setIsEditTitle] = useState(false);
    // const [editedId, setEditedId] = useState('');
    // // 表示fileList 正渲染的 list
    // const [list, setList] = useState<IFile[]>([]);
    // const isEsc = useKeyPress([KeyTypes.Escape]);
    // const isEnter = useKeyPress([KeyTypes.Enter]);






    // // console.log(isSaved);
    // // useEffect(() => {
    // //     if (isSaved) {
    // //         saveFile(activedId);
    // //         console.log('保存成功！');
    // //     }
    // // }, [isSaved])


    // useEffect(() => {
    //     if (isNewingFile) {
    //         setIsEditTitle(true);
    //         setEditedId(recoverFiles(fileList)[0].id);
    //     }

    // }, [isNewingFile])

    // // 
    // useEffect(() => {
    //     setList(recoverFiles(fileList).filter((file: IFile) => !filterIds.includes(file.id)));
    // }, [filterIds, fileList]);


    // /**
    //  * 1. 点击编辑按钮后，将 ListItem 的 title 变成一个 Input
    //  * 2. Input 的默认值为 item.title 并且聚焦和选中了所有字符串
    //  * 3. Input 失去焦点后自动将 Input 的 value 设置给 item.title
    //  */


    // useEffect(() => {
    //     if (searchKey !== undefined) {

    //         const option = {
    //             keys: ['title', 'body'],
    //             includeScore: true
    //         };
    //         // const fuse = new Fuse(fileList as IFile[], option);
    //         const fuse = new Fuse(recoverFiles(fileList) as IFile[], option);

    //         const res: string[] = fuse.search(searchKey).map(({ item }) => {
    //             return item.id;
    //         });

    //         updateFilterIds(difference(recoverFiles(fileList).map((file: IFile) => file.id), res));

    //     }
    // }, [searchKey]);




    // const handleEditTitle = (file: IFile) => {
    //     setIsEditTitle(true);
    //     setEditedId(file.id);
    // }

    // // 分两种情况：
    // // 1. 如果是在新建文件的时候编辑文件名则遍历 list 所有文件名即可
    // // 2. 如果是在修改已存在的文件名的时候则遍历 list 的时候需要跳过该文件
    // const judgeIsExisted = (value: string) => {
    //     if (isNewingFile) {
    //         return list.map((file) => file.title).includes(value);
    //     } else {
    //         return list.filter((file) => file.id !== editedId).map((file) => file.title).includes(value);
    //     }

    // }

    // const validateListen = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value.trim();
    //     if (value === '') {
    //         setIsAlter(true);
    //         setAlertMsg(AlterMsgTypes.EmptyAlert);
    //     } else if (judgeIsExisted(value)) {
    //         setIsAlter(true);
    //         setAlertMsg(AlterMsgTypes.ExistedName);

    //     } else {
    //         setIsAlter(false);
    //         setAlertMsg(AlterMsgTypes.NullMsg);
    //     }
    // }

    // const handleBlur = (file: IFile) => {
    //     setIsEditTitle(false);

    //     const input = editInputRef.current;
    //     const inputValue = input.state.value;

    //     // 如果是新建文件状态下失去焦点
    //     if (!file.title) {
    //         // 如果输入的内容无效则 Esc 的时候删除该文件
    //         if (inputValue === undefined || isAlert) {
    //             deleteFile(list[0].id);

    //         } else {
    //             editFileName({ id: file.id, newName: input.state.value });
    //             newFileFinished(inputValue);
    //         }

    //     } else {
    //         if (!isAlert) {
    //             if (!(input.state.value === file.title) && window.confirm(`Rename to "${input.state.value}" ?`)) {
    //                 editFileName({ id: file.id, newName: input.state.value });
    //             }
    //         }
    //     }
    // }

    // const handleDelete = (file: IFile) => {
    //     if (window.confirm(`Are you sure to remove "${file.title}" ?`)) {
    //         deleteFile(file.id);
    //         // 如果删除的文件id存在 openedFilesId 中 则关闭相应
    //         closeTab(file.id);
    //     }
    // }

    // const handleItemClick = (item: IFile) => {
    //     // 点击了 listItem
    //     // 1. 判断是否存在 openedFilesId 中
    //     //  1.1 如果存在则将 activeId 设置为该 itemId
    //     //  1.2 如果不存在则将该 itemId push 到 activeId 后面，并设置 activeId 为该 itemId

    //     if (new Set(openedFilesId).has(item.id)) {
    //         updateActivedId(item.id);
    //     } else {
    //         // 如果 tabList 为空
    //         updateActivedId(item.id);
    //         openFile(item.id);
    //     }
    // }




    // useEffect(() => {
    //     // 处于编辑状态并且按下回车，则让 input 失去焦点
    //     if (isEnter && isEditTitle) {
    //         const input = editInputRef.current;
    //         const inputValue = input.state.value;

    //         // 如果正在编辑新创建的文件名称
    //         if (isNewingFile) {

    //             // 如果新创建的文件名称是无效的
    //             if (inputValue === undefined || isAlert) {
    //                 if (inputValue === undefined) {
    //                     setIsAlter(true);
    //                     setAlertMsg(AlterMsgTypes.EmptyAlert);
    //                 }

    //                 return;
    //             } else {
    //                 input.blur();
    //             }
    //         } else if (!isAlert) {
    //             input.blur();
    //         }
    //     }
    // }, [isEnter])

    // useEffect(() => {
    //     // 处于编辑状态并且按下按键
    //     if (isEsc && isEditTitle) {
    //         const input = editInputRef.current;
    //         const inputValue = input.state.value;
    //         if (isNewingFile) {
    //             input.blur();
    //             deleteFile(list[0].id);

    //         } else {
    //             input.blur();
    //         }

    //     }
    // }, [isEsc])

    // useEffect(() => {
    //     if (!isFileSearch) {
    //         setList(recoverFiles(fileList));
    //     }
    // }, [isFileSearch])
}


FileList.defaultProps = {
    source: [],
    renameId: undefined
}



export default connect()(FileList);