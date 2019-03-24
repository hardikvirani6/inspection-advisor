import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    SET_ALL_REPORTS,
    SET_CLIENT,
    SET_SELECTED_REPORT
} from './type';
import  {
    updateLocalDB
} from './updatedAppDataAction'
import Constant from '../helper/constant'
import _ from 'lodash'


export const getClientInformation = (reportID) => {
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
            return CallApi(Constant.baseurl+Constant.reportDel + reportID + "/" + Constant.client,'get',{},{"Authorization":header1})
                .then((response)=> {
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};


export const updateClientInformation = (clientInfo,report_id) => {
    return (dispatch, getState) => {
        let reports = _.cloneDeep(getState().appAllData.reports);
        let updatedReport = _.find(reports,{report_id:report_id});
        if(updatedReport !== undefined){
            let index = reports.indexOf(updatedReport);
            updatedReport["client"] = clientInfo;
            reports[index] = updatedReport;

            dispatch({
                type: SET_ALL_REPORTS,
                payload: reports,
            });

            let selectedReport = getState().report.selectedReport;
            selectedReport.report = updatedReport;
            dispatch({
                type: SET_SELECTED_REPORT,
                payload: selectedReport,
            });

            //dispatch(updateLocalDB());
        }
        return Promise.resolve(true);
    };
};


export const addClientInformation = (clientInfo) => {
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
            return CallApi(Constant.baseurl + Constant.client,'post',clientInfo,{"Authorization":header1})
                .then((response)=> {

                     dispatch(
                        getClientInformation()
                    );
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};



