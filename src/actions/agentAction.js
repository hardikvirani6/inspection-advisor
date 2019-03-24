import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    SET_AGENT,
    SET_ALL_REPORTS,
    SET_SELECTED_REPORT
} from './type';
import {
    updateReport
} from './reportAction'
import  {
    updateLocalDB
} from './updatedAppDataAction'
import Constant from '../helper/constant'
import _ from 'lodash'


export const getAgentInformation = (reportID) => {
    return (dispatch, getState) => {
        let token = "";
        let header1 = "";
        return AsyncStorage.getItem('user').then((value) => {

            if(value !== null) {
                let parsedValue = JSON.parse(value);
                token = parsedValue.token;
            }

            header1 = "Bearer " + token

        }).then(()=>{
            return CallApi(Constant.baseurl+Constant.reportDel + reportID + "/" + Constant.agent,'get',{},{"Authorization":header1})
                .then((response)=> {
                    dispatch({
                        type: SET_AGENT,
                        payload: response.agent,
                    });
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};


export const addAgentInformation = (reportID,agentInfo) => {
    return (dispatch, getState) => {
        let token = "";
        let header1 = "";
        return AsyncStorage.getItem('user').then((value) => {

            if(value !== null) {
                let parsedValue = JSON.parse(value);
                token = parsedValue.token;
            }

            header1 = "Bearer " + token

        }).then(()=>{
            return CallApi(Constant.baseurl+Constant.agent,'post',agentInfo,{"Authorization":header1})
                .then((response)=> {

                    return dispatch(
                        updateReport(reportID,{'agent_id':response.data.agent.id})
                    );

                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};


export const updateAgentInformation = (agentInfo,report_id) => {
    return (dispatch, getState) => {
        let reports = _.cloneDeep(getState().appAllData.reports);
        let updatedReport = _.find(reports,{report_id:report_id});
        if(updatedReport !== undefined){
            let index = reports.indexOf(updatedReport);
            updatedReport["agent"] = agentInfo;
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

export const getAllAgent = () => {
    return (dispatch, getState) => {
        let token = "";
        let header1 = "";
        return AsyncStorage.getItem('user').then((value) => {

            if(value !== null) {
                let parsedValue = JSON.parse(value);
                token = parsedValue.token;
            }

            header1 = "Bearer " + token

        }).then(()=>{
            return CallApi(Constant.baseurl+Constant.agent,'get',{},{"Authorization":header1})
                .then((response)=> {
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};




export const filterAgent = (agentInfo) => {
    return (dispatch, getState) => {
        let token = "";
        let header1 = "";
        return AsyncStorage.getItem('user').then((value) => {

            if(value !== null) {
                let parsedValue = JSON.parse(value);
                token = parsedValue.token;
            }

            header1 = "Bearer " + token

        }).then(()=>{
            return CallApi(Constant.baseurl+Constant.agent + "/search?query=" + agentInfo,'get',{},{"Authorization":header1})
                .then((response)=> {
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};
