import { combineReducers } from 'redux';
import { AppNavigator } from '../screens/navigator';
import LoginReducer from './loginReducer';
import ReportListReducer from './reportListReducer';
import ReportSection from './reportSectionReducer';
import ReportSubSection from './reportSubSectionReducer';
import FormElement from './formElementReducer';
import PropertyReducer from './propertyReducer';
import ClientReducer from './clientReducer';
import AgentReducer from './agentReducer';
import ReportReducer from './reportReducer';
import ReportFormReducer from './reportFormReducer';
import ReportTemplateReducer from './reportTemplateReducer';
import CommentReducer from './commentReducer';
import TouchIdReducer from './touchidReducer';
import AppDataReducer from './getAllDataReducer';
import { USER_LOGOUT } from "../actions/type"

const AppReducer = combineReducers({
    nav: (state, action) => (
        AppNavigator.router.getStateForAction(action, state)
    ),
    userlogin:LoginReducer,
    reportList:ReportListReducer,
    reportSection:ReportSection,
    reportSubSection:ReportSubSection,
    report:ReportReducer,
    reportformdata:ReportFormReducer,
    reportTemplate:ReportTemplateReducer,
    formelement:FormElement,
    propertyInfo:PropertyReducer,
    clientInfo:ClientReducer,
    agentInfo:AgentReducer,
    commentList:CommentReducer,
    touchId:TouchIdReducer,
    appAllData:AppDataReducer
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined
    }
    return AppReducer(state, action)
};

export default rootReducer;