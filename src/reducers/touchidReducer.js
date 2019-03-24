import { SET_TOUCH_ID } from "../actions/type"
const INITIAL_STATE = {
    touchid : false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_TOUCH_ID: {
            return {
                ...state,
                touchid: action.payload,

            };
        }

        default:
            return state;

    }
}