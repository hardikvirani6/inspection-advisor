import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    SET_REPORT,
    SET_SELECTED_REPORT,
    SET_ALL_REPORTS
} from './type';
import {
    getReportList
} from './reportListAction'
import Constant from '../helper/constant'
import _ from 'lodash';

export const getReport = (reportID) => {
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
            return CallApi(Constant.baseurl+Constant.reportDel + reportID ,'get',{},{"Authorization":header1})
                .then((response)=> {
                    dispatch({
                        type: SET_REPORT,
                        payload: response.report,
                    });

                    return Promise.resolve(response);
                })
                .catch((error)=>{

                    return Promise.reject(error);
                })
        })
    };
};


export const updateReport = (report_id,data) => {
    return (dispatch, getState) => {

        let reports = _.cloneDeep(getState().appAllData.reports);
        let updatedReport = _.find(reports,{report_id:report_id});
        if(updatedReport !== undefined){
            let index = reports.indexOf(updatedReport);
            updatedReport["inspection_date_time"] = data["inspection_date_time"];
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
        }
        return Promise.resolve(true);
    };
};

export const deleteReport = (report_id) => {
    return (dispatch, getState) => {
    let reports = _.cloneDeep(getState().appAllData.reports);
     _.remove(reports,{report_id: report_id});

        dispatch({
            type: SET_ALL_REPORTS,
            payload: reports,
        });
        return Promise.resolve(true);
    };
};

export const addReport = (reportInfo) => {
    return (dispatch, getState) => {
        let reports = _.cloneDeep(getState().appAllData.reports);
        reports.push(reportInfo);

        dispatch({
            type: SET_ALL_REPORTS,
            payload: reports,
        });
        return Promise.resolve(true);
    };
};

export const setSelectedReport = (report_id, template_id) => {
    return (dispatch, getState) => {
        let report = _.find(getState().appAllData.reports, {report_id: report_id});
        let template = _.find(getState().appAllData.templates, {template_id: parseInt(template_id)});
        if(template === undefined){
            template = {};
        }

        dispatch({
            type: SET_SELECTED_REPORT,
            payload: {
                report: report,
                template: template
            },
        });
    }
};

