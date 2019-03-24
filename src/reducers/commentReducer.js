import { SET_COMMENT } from "../actions/type"
const INITIAL_STATE = {
    comment : [{'comment':'Searching'}]
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_COMMENT: {
            return {
                ...state,
                comment: action.payload,

            };
        }

        default:
            return state;

    }
}