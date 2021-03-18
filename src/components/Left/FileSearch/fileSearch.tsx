import { useEffect, useRef, useState } from 'react';
import { IBaseProps, KeyTypes } from '../../../types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button, Tooltip, Input } from 'antd';
import useKeyPress from '../../../hooks/useKeyPress';
import './fileSearch.scss'

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

    const inputRef = useRef<Input>(null);
    const isEsc = useKeyPress(KeyTypes.Esc);

    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        // 处于搜索状态并且按下 Esc
        if (isEsc && isActive) {
            setIsActive(false);
        }
    }, [isEsc])

    useEffect(() => {
        // 搜索激活的时候，自动让 input focus
        if (isActive) {
            inputRef.current?.focus();
        }
    }, [isActive])


    return (
        <div className='fileSearch-container'>
            {
                !isActive && 
                <div className='fileSearch fileSearch-inactive'>
                    <span className='fileSearch-title'>{title}</span>
                    <Tooltip title='search'>
                        <Button 
                            icon={<FontAwesomeIcon size='lg' icon={faSearch} />}
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
                        ref={inputRef}
                    />
                    <Button
                        icon={<FontAwesomeIcon size='lg' icon={faTimes} />}
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