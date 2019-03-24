import { APP_SET_USER_DATA,USER_EMAIL_CHANGED,USER_PASS_CHANGED} from '../actions/type'

const  INITIAL_STATE = {
    email: "mobile@in4spective.com",
    password: "Password1",
    token:"",
    username:"",
    userdata:{},
    organization_id: '',
    id:''
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_SET_USER_DATA: {
            return {
                ...state,
                email: state.email,
                password: state.password,
                username:action.payload.user.username,
                organization_id:action.payload.user.organization_id,
                id: action.payload.user.id,
                token: action.payload.token,
                userdata:action.payload.user,
            };
        }

        case USER_EMAIL_CHANGED: {
            return {
                ...state,
                email: action.payload,

            };
        }
        case USER_PASS_CHANGED: {
            return {
                ...state,
                password: action.payload,

            };
        }

        default:
            return state;
    }
}