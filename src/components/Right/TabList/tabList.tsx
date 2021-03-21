import { Button, Empty, Tabs } from 'antd'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ActionTypes, IAllDispatch, IBaseProps, IdPayload, IFile, ITab, NewValuePayload, StateTypes } from '../../../types';
import { mockFiles } from '../../../utils/dev';
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import SimpleMDE from "react-simplemde-editor";
// import useHover from '../../../hooks/useTabHover';
import { closeTab, editFile, saveFile, updateActivedId } from '../../../store/actions';
import { IState } from '../../../store/reducer';
import './tabList.scss';


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
        console.log(activedId);
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
                updateActivedId(openedFilesId[openedFilesId.findIndex(id => id === targetKey) - 1]);
            }
            setTabList(tabList.filter((tab: ITab) => !(tab.id === targetKey)));
        }
    }

    const onEditorChange = (value: string) => {
        // 如果文件的 body 发生了变化则将该文件状态设置为 unsaved
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

                                    // closeIcon={
                                    //     <FontAwesomeIcon
                                    //         icon={
                                    //             tab.tabStatus === TabStatus.Default ? faTimes :
                                    //                 tab.tabStatus === TabStatus.Actived ? faTimes : faCircle
                                    //         }

                                    //     />
                                    // }
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
                            // value={tab.body}
                        />
                    </>

            }


        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch): IMappedAction => ({
    saveFile: (newValue: NewValuePayload) => dispatch(saveFile(newValue)),
    closeTab: (id: IdPayload) => dispatch(closeTab(id)),
    editFile: (id: IdPayload) => dispatch(editFile(id)),
    updateActivedId: (id: IdPayload) => dispatch(updateActivedId(id))

});

const mapStateToProps = (state: IState): IMappedState => ({
    openedFilesId: state.openedFilesId,
    unSavedFilesId: state.unSavedFilesId,
    activedId: state.activedId,
    fileList: state.fileList
});


export default connect(mapStateToProps, mapDispatchToProps)(TabList);

