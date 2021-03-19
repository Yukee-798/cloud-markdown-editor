import { ActionTypes } from '../../types'


export const editFile = (payload: string) => ({ type: ActionTypes.EditFile, payload });
export const saveFile = (payload: { id: string, newValue: string }) => ({ type: ActionTypes.SaveFile, payload });