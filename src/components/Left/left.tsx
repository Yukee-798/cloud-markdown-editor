import { Card } from 'antd';
import { IBaseProps } from '../../types';
import FileSearch from './FileSearch/fileSearch';
import './style.scss'

const Left: React.FC<IBaseProps> = (props) => {

    const onKeySearch = () => {

    }
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <div className='left-container'>
            <Card
                title={
                    <FileSearch 
                        title='我的云文档'
                        onKeySearch={onKeySearch}
                        // onChange={onChange}
                        placeholder='查找'
                    />
                }
            >
                123

            </Card>

        </div>
    )
}

export default Left;