import { Button, Empty, Tabs, Modal } from 'antd'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { IBaseProps, IFile, ITab, KeyTypes } from '../../../types';
import SimpleMDE from "react-simplemde-editor";
import './tabList.scss';

interface ITabListProps extends IBaseProps {
    source?: ITab[];
    activedId?: string;
    unSavedFilesId?: string[];
    onTabClick?: (id: string) => void;
}


const TabList: React.FC<ITabListProps> = (props) => {

    // // 当前 tabList 正显示的 tab
    // const [tabList, setTabList] = useState<ITab[]>([]);

    // // 当前激活状态的 activedTabInfo
    // const [activedTabInfo, setActivedTabInfo] = useState<ITab>({
    //     id: '',
    //     body: '',
    //     title: '',
    //     createAt: -1,
    //     path: ''
    // });

    // const isSaved = useKeyPress([KeyTypes.s, KeyTypes.Meta]);


    const {
        source,
        activedId,
        unSavedFilesId,
        onTabClick
    } = props;


    return (
        <div className='tabList-container'>
            {
                source?.length === 0 ?
                    <Empty
                        className='empty-tab-background'
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        description={
                            <span>
                                {/* Customize <a href="#API">Description</a> */}
                                No files have been opened
                            </span>
                        }
                    >
                        <Button type="primary">Create Now</Button>
                    </Empty> :
                    <>
                        <Tabs
                            // animated
                            hideAdd
                            type="editable-card"
                            activeKey={activedId}
                            // onTabClick={() => {
                            //     onTabClick?.()
                            // }}
                            // onEdit={handleEdit}
                        >


                            {
                                source?.map((tab: ITab) => (
                                    <Tabs.TabPane
                                        tab={tab.title}
                                        key={tab.id}
                                        
                                        closeIcon={unSavedFilesId?.includes(tab.id) ? <FontAwesomeIcon icon={faCircle} /> : <span role="img" aria-label="close" className="anticon anticon-close"><svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span>}
                                    >

                                    </Tabs.TabPane>
                                ))
                            }
                        </Tabs>
                        <SimpleMDE

                            options={{
                                status: false,
                                spellChecker: false
                            }}
                            onChange={onEditorChange}
                            value={activedTabInfo?.body}
                        />
                    </>
            }
        </div>
    )


    // useEffect(() => {
    //     if (isSaved) {
    //         saveFile(activedId)
    //     }
    // }, [isSaved])




    // useEffect(() => {
    //     // openedFilesId 存放的顺序就是 tabList 渲染的顺序
    //     const newTabList = openedFilesId.map((id) => {
    //         // return fileList.find((file: IFile) => file.id === id);
    //         return fileList[id]
    //     });
    //     setTabList(newTabList as IFile[])
    // }, [openedFilesId, fileList]);

    // useEffect(() => {
    //     // setActivedTabInfo(fileList.find(file => file.id === activedId) as ITab);
    //     setActivedTabInfo(fileList[activedId] as ITab);
    // }, [activedId]);



    // // const [hoverRef, isHoverd] = useHover();
    // // const mHoverRef = hoverRef as any;
    // // for (let i = 0; i < 10; i++) {
    // //     const [hoverRef, isHoverd] = useHover();
    // // }

    // const handleEdit = (targetKey: any, action: 'remove' | 'add') => {

    //     if (action === 'remove') {
    //         // 如果移除的是当前激活的 tab，则将 activeId 切换到 openedFilesId 中当前关闭标签id 的前一个
    //         closeTab(targetKey);
    //         if (activedId === targetKey) {
    //             // 如果当前关闭的 tab 处于 openedList 的第一个元素则 activedId 设置为其后面一个
    //             if (targetKey === openedFilesId[0]) {
    //                 updateActivedId(openedFilesId[1]);
    //             } else {
    //                 updateActivedId(openedFilesId[openedFilesId.findIndex(id => id === targetKey) - 1]);
    //             }

    //         }

    //         // 如果当前移除的文件存在于未保存list中，则弹出 confirm
    //         if (unSavedFilesId.includes(targetKey)) {
    //             if (window.confirm(`Do you want to save the changes you made to ${activedTabInfo.title}?`)) {
    //                 // saveFile({id: targetKey, newValue: })
    //             }
    //         }

    //         setTabList(tabList.filter((tab: ITab) => !(tab.id === targetKey)));
    //     }
    // }

    // const onEditorChange = (value: string) => {
    //     // 如果文件的 body 发生了变化则将该文件状态设置为 unsaved
    //     if (value !== activedTabInfo?.body) {
    //         editFile({ id: activedId, newValue: value });
    //     }
    //     console.log(value);

    // }
}

export default TabList;

