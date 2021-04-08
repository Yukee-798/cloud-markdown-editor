import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button, Tooltip, Input } from 'antd';
import {IBaseProps } from '../../../types'
import './fileSearch.scss'


interface IFileSearchProps extends IBaseProps {
    title?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    onClick?: () => void;
    isFileSearch?: boolean;
}

const FileSearch: React.FC<IFileSearchProps> = (props) => {

    const {
        title,
        placeholder,
        isFileSearch,
        onChange,
        onClick
    } = props;

    const inputRef = useRef<Input>(null);
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange?.(value);
        setValue(value);
    }

    useEffect(() => {
        // 搜索激活的时候，自动让 input focus
        if (isFileSearch) {
            inputRef.current?.focus();
        } else {
            setValue('');
        }
    }, [isFileSearch])


    return (
        <div className='fileSearch-container'>
            {
                !isFileSearch &&
                <div className='fileSearch fileSearch-inactive'>
                    <span className='fileSearch-title'>{title}</span>
                    <Tooltip title='search'>
                        <Button
                            icon={<FontAwesomeIcon size='lg' icon={faSearch} />}
                            // shape='circle'
                            onClick={onClick}
                        >
                        </Button>
                    </Tooltip>
                </div>
            }
            {
                isFileSearch &&
                <div className='fileSearch fileSearch-active'>
                    <Input
                        onChange={handleChange}
                        placeholder={placeholder}
                        value={value}
                        ref={inputRef}
                    />
                    <Button
                        icon={<FontAwesomeIcon size='lg' icon={faTimes} />}
                        onClick={onClick}
                    >
                    </Button>
                </div>
            }

        </div>
    )
}


export default FileSearch;