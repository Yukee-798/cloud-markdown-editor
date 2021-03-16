import { IBaseProps, IFile } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

import './style.scss';
import { Button, List, Tooltip } from 'antd';




interface IFileListProps extends IBaseProps {
    files?: any[];
    onFileClick?: () => void;
    onFileDelete?: () => void;
    onSaveEdit?: (id: number, newTitle: string) => void;
}

const FileList: React.FC<IFileListProps> = (props) => {



    const { files } = props;
    return (
        <div className='fileList-container'>
            <List
                className='fileList'
                dataSource={files}
                renderItem={(item: IFile) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<FontAwesomeIcon icon={faMarkdown} />}
                            title={item.title}
                        />
                        <Tooltip
                            autoAdjustOverflow
                            title='edit'
                        >
                            <Button
                                icon={<FontAwesomeIcon icon={faEdit} />}
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



                    </List.Item>
                )}

            />

        </div>
    )
}

export default FileList;