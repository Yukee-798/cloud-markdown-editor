import { IBaseProps, IFile, KeyTypes } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

import './style.scss';
import { Button, Input, List, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';




interface IFileListProps extends IBaseProps {
    files?: IFile[];
    onFileClick?: (id: number) => void;
    onFileDelete?: (id: number) => void;
    onTitleEdit?: (id: number, newTitle: string) => void;
    onFileEdit?: (id: number) => void;
}

const FileList: React.FC<IFileListProps> = (props) => {



    const {
        files,
        onFileClick,
        onFileDelete,
        onTitleEdit,
        onFileEdit 
    } = props;

    const editInputRef = useRef(new Input({defaultValue:''}));


    const [isEditTitle, setIsEditTitle] = useState(false);
    const [fileList, setFileList] = useState<IFile[]>(files as IFile[]);
    const [editedId, setEditedId] = useState(0);

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
        const newList: IFile[] = fileList?.map((file) => {
            if (file.id === editedId) {
                if (!(input.state.value === file.title)) {
                    if (window.confirm(`Rename to "${input.state.value}" ?`)) {
                        return { ...file, title: input.state.value };
                    }
                }
                return file;
            }
            return file;
        });
        
        setFileList(newList)
    }

    useEffect(() => {
        if (isEditTitle) {
            const input = editInputRef.current;
            const value: string = input.state.value;
            input?.focus();
            input?.setSelectionRange(0, value.length);
        }
    }, [isEditTitle]);


    // 如果按下 Esc 则退出编辑状态
    const cancelEdit = (ev: KeyboardEvent) => {
        const { key } = ev;
        if (key === KeyTypes.Esc) {
            setIsEditTitle(false);
        }
    }
    useEffect(() => {
        document.addEventListener('keyup', cancelEdit);
        return () => {
            document.removeEventListener('keyup', cancelEdit);
        }
    })


    return (
        <div className='fileList-container'>
            <List
                className='fileList'
                dataSource={fileList}
                renderItem={(item: IFile) => (
                    <List.Item
                        key={item.id}
                        onClick={() => { onFileClick?.(item.id) }}
                    >
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

export default FileList;