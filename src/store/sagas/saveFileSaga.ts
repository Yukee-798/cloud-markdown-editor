import { call, put, takeEvery, select } from 'redux-saga/effects'
import { fileHelper } from '../../utils/index'
import { ActionTypes, IAction, IFile, SAVE_LOCATION } from '../../types'
import { IState } from '../reducer';

const { join } = window.require('path');

export default function* saveFileSaga() {
    yield takeEvery(ActionTypes.EditFile, function* (action: IAction) {
        const { payload: { id, newValue } } = action;
        const { fileList }: { fileList: IFile[] } = yield select((state: IState) => ({
            fileList: state.fileList
        }));

        const targetFileName = fileList.find(file => file.id === id)?.title;

        try {
            const res = yield call(fileHelper.writeFile, join(SAVE_LOCATION, targetFileName), newValue);
            console.log('保存成功！', res);
        } catch (err) {
            console.log(err);
        }
    })
}