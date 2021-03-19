import { combineReducers } from 'redux'
import left, { IState as ILeftState } from './left'
import right, { IState as IRightState } from './right'

export interface IRootState {
    left: ILeftState;
    right: IRightState;
}

const rootReducer = {
    left,
    right
}

export default combineReducers(rootReducer)