import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button, Tooltip, Input } from 'antd';
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import useKeyPress from '../../../hooks/useKeyPress';
import { ActionTypes, IAllDispatch, IBaseProps, KeyTypes, StateTypes } from '../../../types'
import { exitFileSearch, fileSearch } from '../../../store/actions';
import { IState } from '../../../store/reducer';
import './fileSearch.scss'

interface IMappedState extends Pick<IState, StateTypes.IsFileSearch> {}

interface IMappedAction extends Pick<IAllDispatch, ActionTypes.FileSearch | ActionTypes.ExitFileSearch> {}

interface IFileSearchProps extends IBaseProps, IMappedState, IMappedAction {
    title?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

const FileSearch: React.FC<IFileSearchProps> = (props) => {

    const {
        title,
        placeholder,
        isFileSearch,
        exitFileSearch,
        fileSearch,
        onChange
    } = props;

    const inputRef = useRef<Input>(null);
    const isEsc = useKeyPress(KeyTypes.Esc);
    const [value, setValue] = useState('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {


        const value = e.target.value;
        onChange?.(value);
        setValue(value);
    }

    useEffect(() => {
        // 处于搜索状态并且按下 Esc
        if (isEsc && isFileSearch) {
            exitFileSearch();
        }
    }, [isEsc])

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
                            onClick={() => fileSearch()}
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
                        // shape='circle'
                        onClick={() => exitFileSearch()}
                    >
                    </Button>
                </div>
            }

        </div>
    )
}

const mapStateToProps = (state: IState): IMappedState => ({
    isFileSearch: state.isFileSearch
});
const mapDispatchToProps = (dispatch: Dispatch): IMappedAction => ({
    fileSearch: () => dispatch(fileSearch()),
    exitFileSearch: () => dispatch(exitFileSearch())
});

export default connect(mapStateToProps, mapDispatchToProps)(FileSearch);