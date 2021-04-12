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


    return (
        <div className='right-container'>
            <TabList
                activedId={ }
                source={ }
                unSavedFilesId={}
                onTabClick={() => {

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