import { CallApi } from '../services/apiCall';
import {

    AsyncStorage

} from 'react-native';
import Constant from '../helper/constant'

export const sendReportData = (reportFormData,reportID) => {
    return (dispatch, getState) => {

        let token = "";
        let header1 = "";
        return AsyncStorage.getItem('user').then((value) => {

            if(value != null) {
                let parsedValue = JSON.parse(value);
                token = parsedValue.token;
            }

            header1 = "Bearer " + token

        }).then(()=>{
            return CallApi(Constant.baseurl+Constant.generateReport + "send/" + reportID,'post',reportFormData,{"Authorization":header1})
                .then((response)=> {
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};