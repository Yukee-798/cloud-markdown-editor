import { Button, Empty, Tabs, Modal } from 'antd'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { ActionTypes, IAllDispatch, IBaseProps, IdPayload, IFile, ITab, NewValuePayload, StateTypes } from '../../../types';
import { mockFiles } from '../../../utils/dev';
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import SimpleMDE from "react-simplemde-editor";
// import useHover from '../../../hooks/useTabHover';
import { closeTab, editFile, saveFile, updateActivedId } from '../../../store/actions';
import { IState } from '../../../store/reducer';
import './tabList.scss';

// const { confirm } = Modal;

// const showConfirm = () => {
//     confirm({
//         title: 'Are you sure delete this task?',
//         icon: <FontAwesomeIcon icon={faExclamationCircle} />,
//         content: 'Some descriptions',
//         okText: 'Yes',
//         okType: 'danger',
//         okButtonProps: {
//             disabled: true,
//         },
//         cancelText: 'No',
//         onOk() {
//             console.log('OK');
//         },
//         onCancel() {
//             console.log('Cancel');
//         },
//     });
// }

const tabs = mockFiles(5);


interface IMappedState extends Pick<IState,
    StateTypes.OpenedFilesId |
    StateTypes.UnSavedFilesId |
    StateTypes.ActivedId |
    StateTypes.FileList
> { }

interface IMappedAction extends Pick<IAllDispatch,
    ActionTypes.CloseTab |
    ActionTypes.EditFile |
    ActionTypes.SaveFile |
    ActionTypes.UpdateActivedId
> { }

interface ITabListProps extends IBaseProps, IMappedState, IMappedAction { }

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
const TabList: React.FC<ITabListProps> = (props) => {

    // 当前 tabList 正显示的 tab
    const [tabList, setTabList] = useState<ITab[]>([]);

    // 当前激活状态的 activedTabInfo
    const [activedTabInfo, setActivedTabInfo] = useState<ITab>({
        id: '',
        body: '',
        title: '',
        createAt: -1
    });



    const {
        // state
        openedFilesId,
        unSavedFilesId,
        activedId,
        fileList,

        // action
        closeTab,
        editFile,
        saveFile,
        updateActivedId

    } = props;



    useEffect(() => {
        // openedFilesId 存放的顺序就是 tabList 渲染的顺序
        const newTabList = openedFilesId.map((id) => {
            return fileList.find((file: IFile) => file.id === id);
        });
        setTabList(newTabList as IFile[])
    }, [openedFilesId])

    useEffect(() => {
        setActivedTabInfo(fileList.find(file => file.id === activedId) as ITab);
    }, [activedId]);



    // const [hoverRef, isHoverd] = useHover();
    // const mHoverRef = hoverRef as any;
    // for (let i = 0; i < 10; i++) {
    //     const [hoverRef, isHoverd] = useHover();
    // }

    const handleEdit = (targetKey: any, action: 'remove' | 'add') => {

        if (action === 'remove') {
            // 如果移除的是当前激活的 tab，则将 activeId 切换到 openedFilesId 中当前关闭标签id 的前一个
            closeTab(targetKey);
            if (activedId === targetKey) {
                // 如果当前关闭的 tab 处于 openedList 的第一个元素则 activedId 设置为其后面一个
                if (targetKey === openedFilesId[0]) {
                    updateActivedId(openedFilesId[1]);
                } else {
                    updateActivedId(openedFilesId[openedFilesId.findIndex(id => id === targetKey) - 1]);
                }

            }

            // 如果当前移除的文件存在于未保存list中，则弹出 confirm
            if (unSavedFilesId.includes(targetKey)) {
                if (window.confirm(`Do you want to save the changes you made to ${activedTabInfo.title}?`)) {
                    // saveFile({id: targetKey, newValue: })
                }
            }

            setTabList(tabList.filter((tab: ITab) => !(tab.id === targetKey)));
        }
    }

    const onEditorChange = (value: string) => {
        // 如果文件的 body 发生了变化则将该文件状态设置为 unsaved
        if (value !== activedTabInfo?.body) {
            editFile({id: activedId, newValue: value});
        }
        console.log(value);

    }


    return (
        <div className='tabList-container'>
            {
                openedFilesId.length === 0 ?
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
                            onTabClick={(key: string) => { updateActivedId(key) }}
                            onEdit={handleEdit}
                        >


                            {
                                tabList.map((tab: ITab) => (
                                    <Tabs.TabPane
                                        tab={tab.title}
                                        key={tab.id}
                                        closeIcon={unSavedFilesId.includes(tab.id) ? <FontAwesomeIcon icon={faCircle} /> : <span role="img" aria-label="close" className="anticon anticon-close"><svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span>}
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
}

const mapDispatchToProps = (dispatch: Dispatch): IMappedAction => ({
    saveFile: (id: IdPayload) => dispatch(saveFile(id)),
    closeTab: (id: IdPayload) => dispatch(closeTab(id)),
    editFile: (newValue: NewValuePayload) => dispatch(editFile(newValue)),
    updateActivedId: (id: IdPayload) => dispatch(updateActivedId(id))

});

const mapStateToProps = (state: IState): IMappedState => ({
    openedFilesId: state.openedFilesId,
    unSavedFilesId: state.unSavedFilesId,
    activedId: state.activedId,
    fileList: state.fileList
});


export default connect(mapStateToProps, mapDispatchToProps)(TabList);

