import { SET_TOUCH_ID } from './type';

export const setTouchId = (touchID) => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_TOUCH_ID,
            payload: touchID,
        });
    };
};