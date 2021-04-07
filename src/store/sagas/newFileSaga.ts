import { call, put, takeEvery } from 'redux-saga/effects'
import { fileHelper } from '../../utils/index'
import { ActionTypes, IAction, SAVE_LOCATION } from '../../types'
import { updateActivedId } from '../actions';

const { join } = window.require('path');

export default function* newFileSaga() {

    yield takeEvery(ActionTypes.NewFileFinished, function* (action: IAction) {
        const { payload } = action;
        try {
            const res = yield call(fileHelper.writeFile, join(SAVE_LOCATION, payload), '');
            
            yield put(updateActivedId(''));
            console.log('创建成功！', res);
        } catch(err) {
            console.log(err);
        }
    })
}