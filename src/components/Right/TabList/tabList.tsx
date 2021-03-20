import { Tabs } from 'antd'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ITab, TabStatus } from '../../../types';
import { mockTabs } from '../../../utils/dev';
import SimpleMDE from "react-simplemde-editor";
import './tabList.scss';
// import useHover from '../../../hooks/useTabHover';

const tabs = mockTabs(5);

/**
 * 需求：
 * 1. 点击左侧的文件树时，会不断替换处于选中状态的 tab
 * 2. 如果 选中状态的 tab 处于编辑未保存状态，则 tab 右侧 x 变为原点
 *      2.1 处于编辑未保存状态下继续打开左侧文件，会在当前 tabList 中寻找
 *          * 如果找到则切换到对应 tab
 *          * 如果没找到则在当前未保存的 tab 后面 append 新的 tab 然后新的 tab 处于选中状态
 * 3. 如果选中状态的 tab 处于保存状态，则点击左侧的新文件的时候会覆盖掉当前 tab 位置
 * 
 * 简单的说：tabList 中只能存在一个处于保存状态的 tab，其余的都是未保存状态的 tab
 * 
 * 
 */
const TabList = () => {

    const [activeId, setActiveId] = useState('0');
    const [tabList, setTabList] = useState<ITab[]>(tabs);
    // const [hoverRef, isHoverd] = useHover();
    // const mHoverRef = hoverRef as any;
    // for (let i = 0; i < 10; i++) {
    //     const [hoverRef, isHoverd] = useHover();
    // }

    const handleEdit = (targetKey: any, action: 'remove' | 'add') => {
        if (action === 'remove') {
            setTabList(tabList.filter((tab: ITab) => !(tab.id === targetKey)));
        }
    }

    useEffect(() => {
        console.log(activeId);
    }, [activeId])


    const onEditorChange = (value: string) => {
        console.log(value);
    }
    return (
        <div className='tabList-container'>
            <Tabs
                // animated
                hideAdd
                type="editable-card"
                activeKey={activeId}
                onTabClick={(key: string) => { setActiveId(key) }}
                onEdit={handleEdit}
            >


                {
                    tabList.map((tab: ITab) => (
                        <Tabs.TabPane
                            tab={tab.title}
                            key={tab.id}

                        // closeIcon={
                        //     <FontAwesomeIcon
                        //         icon={
                        //             tab.tabStatus === TabStatus.Default ? faTimes :
                        //                 tab.tabStatus === TabStatus.Actived ? faTimes : faCircle
                        //         }

                        //     />
                        // }
                        >
                            <SimpleMDE 

                                options={{
                                    status: false,
                                    spellChecker: false
                                }}
                                onChange={onEditorChange}
                                
                            />
                        </Tabs.TabPane>
                    ))
                }
            </Tabs>
        </div>
    )
}


export default TabList;

