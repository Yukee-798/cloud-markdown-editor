import { useEffect, useState } from 'react';
import { IBaseProps, KeyTypes } from '../../../types'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import './style.scss'
import { Button, Tooltip, Input } from 'antd';

interface IFileSearchProps extends IBaseProps{
    title?: string;
    placeholder?: string;
    onKeySearch?: () => void;
    onChange?: () => void;
    
    
}


const FileSearch: React.FC<IFileSearchProps> = (props) => {

    const {
        className,
        title,
        placeholder,
        onChange,
        onKeySearch
    } = props;


    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');


    const cancelSearch = (e: KeyboardEvent): void => {
        const { key } = e;
        // 如果按了 Esc 则退出搜索
        if (key === KeyTypes.Esc && isActive) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keyup', cancelSearch);
        return () => {
            document.removeEventListener('keyup', cancelSearch)
        };
    })


    return (
        <div className='fileSearch-container'>
            {
                !isActive && 
                <div className='fileSearch fileSearch-inactive'>
                    <span>{title}</span>
                    <Tooltip title='search'>
                        <Button 
                            icon={<SearchOutlined />}
                            // shape='circle'
                            onClick={() => setIsActive(!isActive)}
                        >
                        </Button>
                    </Tooltip>
                </div>
            }
            {
                isActive &&
                <div className='fileSearch fileSearch-active'>
                    <Input 
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={placeholder}
                        value={value}
                    />
                    <Button
                        icon={<CloseOutlined />}
                        // shape='circle'
                        onClick={() => setIsActive(!isActive)}
                    >
                    </Button>
                </div>
            }

        </div>
    )
}

export default FileSearch;