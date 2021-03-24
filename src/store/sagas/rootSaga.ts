import { all } from "redux-saga/effects";
import deleteFileSaga from './deleteFileSaga'
import importFileSaga from './importFileSaga'
import newFileSaga from './newFileSaga'
import renameFileSaga from './renameFileSaga'
import saveFileSaga from './saveFileSaga'

export default function* rootSaga() {
    yield all([
        deleteFileSaga(),
        importFileSaga(),
        newFileSaga(),
        renameFileSaga(),
        saveFileSaga()
    ])
}
