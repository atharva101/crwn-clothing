import { UserActionTypes } from './user.types'

export const setCurrectUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user

});  