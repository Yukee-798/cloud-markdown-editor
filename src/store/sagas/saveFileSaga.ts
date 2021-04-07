import { call, put, takeEvery, select } from 'redux-saga/effects'
import { fileHelper } from '../../utils/index'
import { ActionTypes, IAction, IFile, SAVE_LOCATION } from '../../types'
import { IState } from '../reducer';

const { join } = window.require('path');

export default function* saveFileSaga() {
    yield takeEvery(ActionTypes.SaveFile, function* (action: IAction) {
        const { payload } = action;
        const { fileList }: { fileList: IFile[] } = yield select((state: IState) => ({
            fileList: state.fileList
        }));
        const targetFile: IFile = fileList.find(file => file.id === payload) as IFile;

        try {
            yield call(fileHelper.writeFile, join(SAVE_LOCATION, targetFile.title), targetFile.body);
            console.log('保存成功！');
        } catch (err) {
            console.log(err);
        }
    })
}