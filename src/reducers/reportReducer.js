import { SET_REPORT, SET_SELECTED_REPORT } from "../actions/type"
const INITIAL_STATE = {
    report : {},
    selectedReport: {
        report:{},
        template: {}
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_REPORT: {
            return {
                ...state,
                report: action.payload,

            };
        }
        case SET_SELECTED_REPORT: {
            return {
                ...state,
                selectedReport: action.payload,
            };
        }


        default:
            return state;

    }
}