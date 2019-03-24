import {Platform, ToastAndroid} from 'react-native';
import {
    SET_UPDATED_DATA,
    SET_ALL_REPORTS
} from './type';
import _ from 'lodash';
import { CallApi } from '../services/apiCall';

export const setUpdatedData = (updatedData) => {
    return (dispatch, getState) => {

        let updatedDataArr = getState().appAllData.updatedData;
        let updatedReport = _.find(updatedDataArr,{primary_key:updatedData.primary_key});

        if(updatedReport !== undefined) {
            let index = updatedDataArr.indexOf(updatedReport);
            updatedDataArr[index] = updatedData;
        }else{
            updatedDataArr.push(updatedData);
        }

        dispatch({
            type: SET_UPDATED_DATA,
            payload: updatedDataArr,
        });

        return Promise.resolve(true);
    }
};

export const postUpdatedData = () => {
    return (dispatch, getState) => {
        let updatedDataArr = getState().appAllData.updatedData;

        if(Platform.OS === "ios"){
            //alert('Back');
        }
        else{
            ToastAndroid.show('Background', ToastAndroid.SHORT);
        }

        if(updatedDataArr.length !== 0) {
            debugger;
            let token = "Bearer " + getState().userlogin.token;
            return CallApi("http://staging-api.inspectionadvisor.com/api/v1/coordinator/sync/data", 'post',
                updatedDataArr[0], {"Authorization":token})
                .then((response)=> {
                    debugger;
                    dispatch(updateLocalDB(response.data[0]));
                    return Promise.resolve(true);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                });
        }
        else {
            return Promise.resolve(false);
        }
    }
};

export const updateLocalDB = (res) => {
    return (dispatch, getState) => {

        let updatedDataArr = getState().appAllData.updatedData;
        let reports = getState().appAllData.reports;
        let filteredData = _.find(updatedDataArr, {operation_id: res.operation_id});

        debugger;
        if(filteredData !== undefined) {

            if(Platform.OS === "ios"){
                alert(filteredData.resource+" "+filteredData.operation);
            }
            else{
                ToastAndroid.show(filteredData.resource+" "+filteredData.operation, ToastAndroid.SHORT);
            }
            if (filteredData.resource === 'report' && filteredData.operation === 'INSERT') {
                let report = _.find(reports, {report_id: filteredData.primary_key});

                if (report !== undefined) {
                    let index = reports.indexOf(report);
                    reports[index].report_id = res.id;
                    delete reports[index]["isLocal"];
                }

                dispatch({
                    type: SET_ALL_REPORTS,
                    payload: reports
                });

                //update report_id of other object in queue related to that report
                let dataToBeUpdate = _.filter(updatedDataArr, {report_id: filteredData.primary_key});
                for (i = 0; i < dataToBeUpdate.length; i++) {
                    let dataArr = getState().appAllData.updatedData;
                    let dataObject = _.find(dataArr, {primary_key: dataToBeUpdate[i].primary_key});

                    if (dataObject !== undefined) {
                        let index = dataArr.indexOf(dataObject);
                        dataArr[index].report_id = res.id;
                    }

                    dispatch({
                        type: SET_UPDATED_DATA,
                        payload: dataArr,
                    });
                }
            }
            else if (filteredData.resource === 'property' && filteredData.operation === 'INSERT') {
                let property = _.find(reports, {report_id: filteredData.report_id});

                let index = reports.indexOf(property);
                reports[index].property.id = res.id;
                delete reports[index].property.isLocal;

                dispatch({
                    type: SET_ALL_REPORTS,
                    payload: reports,
                });
            }
            else if (filteredData.resource === 'agent' && filteredData.operation === 'INSERT') {
                let agent = _.find(reports, {report_id: filteredData.report_id});

                let index = reports.indexOf(agent);
                reports[index].agent.id = res.id;
                delete reports[index].agent.isLocal;

                dispatch({
                    type: SET_ALL_REPORTS,
                    payload: reports,
                });
            }
            else if (filteredData.resource === 'client' && filteredData.operation === 'INSERT') {
                let client = _.find(reports, {report_id: filteredData.report_id});

                let index = reports.indexOf(client);
                reports[index].client.id = res.id;
                delete reports[index].client.isLocal;

                dispatch({
                    type: SET_ALL_REPORTS,
                    payload: reports,
                });
            }
            else if (filteredData.resource === 'property_image' && filteredData.operation === 'UPDATE') {
                let property = _.find(reports, {report_id: filteredData.report_id});

                let index = reports.indexOf(property);
                reports[index].property.image_path = res.image_path;

                dispatch({
                    type: SET_ALL_REPORTS,
                    payload: reports,
                });
            }
            else if (filteredData.resource === 'client_image' && filteredData.operation === 'UPDATE') {
                let property = _.find(reports, {report_id: filteredData.report_id});

                let index = reports.indexOf(property);
                reports[index].client.image_path = res.image_path;

                dispatch({
                    type: SET_ALL_REPORTS,
                    payload: reports,
                });
            }
            else if (filteredData.resource === 'agent_image' && filteredData.operation === 'UPDATE') {
                let property = _.find(reports, {report_id: filteredData.report_id});

                let index = reports.indexOf(property);
                reports[index].agent.image_path = res.image_path;

                dispatch({
                    type: SET_ALL_REPORTS,
                    payload: reports,
                });
            }
            else if (filteredData.resource === 'formData' && filteredData.operation === 'INSERT') {
                let updatedReport = _.find(reports, {report_id: filteredData.report_id});

                if(updatedReport !== undefined) {
                    let index = reports.indexOf(updatedReport);
                    let key = "subsection_" + filteredData.data.report_subsection_id;
                    let dataInfo = updatedReport["data"];

                    dataInfo[key].filedata.id = res.id;
                    delete dataInfo[key].filedata.isLocal;

                    updatedReport["data"] = dataInfo;
                    reports[index] = updatedReport;

                    dispatch({
                        type: SET_ALL_REPORTS,
                        payload: reports,
                    });
                }
            }
            else if (filteredData.resource === 'images' && filteredData.operation === 'INSERT') {
                let updatedReport = _.find(reports, {report_id: filteredData.report_id});
                /*delete reports[index].client.isLocal;*/

                if(updatedReport !== undefined) {
                    let index = reports.indexOf(updatedReport);
                    let key = "subsection_" + filteredData.report_subsection_id;
                    let dataInfo = updatedReport["data"];

                    let imageData = _.find(dataInfo[key].images, {id: filteredData.primary_key});
                    let imageIndex = dataInfo[key].images.indexOf(imageData);

                    dataInfo[key].images[imageIndex].original = res.original;
                    dataInfo[key].images[imageIndex].id = res.id;
                    delete dataInfo[key].images[imageIndex].isLocal;
                    updatedReport["data"] = dataInfo;
                    reports[index] = updatedReport;

                    dispatch({
                        type: SET_ALL_REPORTS,
                        payload: reports,
                    });
                }
            }
            else if (filteredData.resource === 'videos' && filteredData.operation === 'INSERT') {
                let updatedReport = _.find(reports, {report_id: filteredData.report_id});

                if(updatedReport !== undefined) {
                    let index = reports.indexOf(updatedReport);
                    let key = "subsection_" + filteredData.report_subsection_id;
                    let dataInfo = updatedReport["data"];

                    let videosData = _.find(dataInfo[key].videos, {id: filteredData.primary_key});
                    let videoIndex = dataInfo[key].videos.indexOf(videosData);

                    dataInfo[key].videos[videoIndex].src_url = res.src_url;
                    dataInfo[key].videos[videoIndex].id = res.id;
                    delete dataInfo[key].videos[videoIndex].isLocal;
                    updatedReport["data"] = dataInfo;
                    reports[index] = updatedReport;

                    dispatch({
                        type: SET_ALL_REPORTS,
                        payload: reports,
                    });
                }
            }

            if(res.status === 1){
                _.remove(updatedDataArr, {operation_id: res.operation_id});

                dispatch({
                    type: SET_UPDATED_DATA,
                    payload: updatedDataArr
                });
            }


        }
    }
};