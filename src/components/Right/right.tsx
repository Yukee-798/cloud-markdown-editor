import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { closeTab, editFile, saveFile, updateActivedId } from '../../store/actions';
import { IState } from '../../store/reducer';
import { ActionTypes, IAllDispatch, IBaseProps, IdPayload, NewValuePayload, StateTypes } from '../../types';
import TabList from './TabList/tabList';
import './right.scss'



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


interface IRightProps extends IBaseProps, IMappedState, IMappedAction {

}

const Right: React.FC<IRightProps> = (props) => {


    const {
        activedId,
        closeTab,
        editFile,
        fileList,
        openedFilesId,
        saveFile,
        unSavedFilesId,
        updateActivedId,

    } = props;



    const handleTabRemove = (key: string) => {

        /** 处理关闭激活的 tab 后，activedId 的变化 */
        if (activedId === key) {
            if (key === openedFilesId[0]) { // 激活 tab 为第一个 tab
                updateActivedId(openedFilesId[1]);
                closeTab(key);
            } else { // 激活 tab 不为第一个 tab
                updateActivedId(openedFilesId[openedFilesId.findIndex(id => id === key) - 1]);
                closeTab(key)
            }

        }

        /** 处理关闭的 tab 处于未保存状态的情况 */
        if (unSavedFilesId.includes(key)) {
            if (window.confirm(`Do you want to save the changes you made to ${fileList[key].title}?`)) {
                // 保存文件到本地，并将 key 从 unSavedFilesId、openedFilesId 中移除，
            }
        }
    }



    return (
        <div className='right-container'>
            <TabList
                activedId={activedId}
                source={openedFilesId.map((id) => fileList[id])}
                unSavedFilesId={unSavedFilesId}
                onTabClick={(key, event) => {
                    updateActivedId(key);
                }}

                onTabRemove={handleTabRemove}

                onContentChange={(value) => {
                    // 如果文件的 body 发生了变化则将该文件状态设置为 unsaved
                    if (value !== fileList[activedId].body) {
                        editFile({ id: activedId, newValue: value });
                    }
                    console.log(value);
                }}

            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Right);