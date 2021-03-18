import { IBaseProps } from '../../types';
import './right.scss'
import TabList from './TabList/tabList';


const Right: React.FC<IBaseProps> = (props) => {
    return (
        <div className='right-container'>
            <TabList />
        </div>
    )
}

export default Right;