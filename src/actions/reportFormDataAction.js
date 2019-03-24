import React, { Component } from 'react';
import {

    AsyncStorage

} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    SET_FORMDATA,
    GET_IMAGES,
    GET_VIDEOS,
    SET_ALL_REPORTS,
    SET_SELECTED_REPORT
} from './type';
import Constant from '../helper/constant'
let _ = require('lodash');


export const getReportData = (subsectionID,reportID) => {
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
            return CallApi(Constant.baseurl+Constant.reportSubSection + subsectionID + "/formdata/" + Constant.reportDel + reportID,'get',{},{"Authorization":header1})
                .then((response)=> {

                    dispatch({
                        type: SET_FORMDATA,
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

export const addReportData = (formData) => {
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
            return CallApi(Constant.baseurl+Constant.reportFiledata,'post',formData,{"Authorization":header1})
                .then((response)=> {
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};


export const updateReportData = (formData,report_id) => {
    return (dispatch, getState) => {

        let reports = _.cloneDeep(getState().appAllData.reports);
        let updatedReport = _.find(reports,{report_id:report_id});
        if(updatedReport !== undefined){
            let index = reports.indexOf(updatedReport);

            if((updatedReport.data).hasOwnProperty(Object.keys(formData)[0])){
                updatedReport.data[Object.keys(formData)[0]] = Object.values(formData)[0];
            }else{
                if(updatedReport.data.length === 0 || updatedReport.data.length !== undefined){
                    updatedReport.data = {};
                    updatedReport.data[Object.keys(formData)[0]] = Object.values(formData)[0];
                }else{
                    updatedReport.data[Object.keys(formData)[0]] = Object.values(formData)[0];
                }

            }

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



export const addReportImages = (formData) => {
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
            return CallApi(Constant.mediaBaseUrl + Constant.reportImages, 'post',formData,{"Authorization":header1})
                .then((response)=> {
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};


export const getReportImages = (subsecid, reportid) => {
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
            return CallApi(Constant.mediaBaseUrl + Constant.reportMediaSubSection + subsecid + "/images/report/" + reportid , 'get', {},{"Authorization":header1})
                .then((response)=> {

                    dispatch({
                        type: GET_IMAGES,
                        payload: response.images,
                    });

                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};

export const addReportVideo = (videoObj, report_id, ssid) => {
    return (dispatch, getState) => {
        let reports = _.cloneDeep(getState().appAllData.reports);
        let updatedReport = _.find(reports,{report_id:report_id});
        if(updatedReport !== undefined){
            let index = reports.indexOf(updatedReport);
            let key = "subsection_" + ssid;
            let data = updatedReport["data"];
            data[key].videos.push(videoObj);
            updatedReport["data"] = data;
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

export const getReportVideo = (subsecid, reportid) => {
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
            return CallApi(Constant.mediaBaseUrl + Constant.reportMediaSubSection + subsecid + "/videos/report/" + reportid , 'get', {},{"Authorization":header1})
                .then((response)=> {

                    dispatch({
                        type: GET_VIDEOS,
                        payload: response.videos,
                    });

                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};

export const deleteReportVideo = (e, report_id, ssid) => {
    return (dispatch, getState) => {
        let reports = _.cloneDeep(getState().appAllData.reports);
        let updatedReport = _.find(reports,{report_id:report_id});
        if(updatedReport !== undefined){
            let index = reports.indexOf(updatedReport);
            let key = "subsection_" + ssid;
            let dataInfo = updatedReport["data"];
            dataInfo[key].videos.splice(e, 1);
            updatedReport["data"] = dataInfo;
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

export const deleteReportImage = (e, report_id, ssid) => {
    return (dispatch, getState) => {
        let reports = _.cloneDeep(getState().appAllData.reports);
        let updatedReport = _.find(reports,{report_id:report_id});
        if(updatedReport !== undefined){
            let index = reports.indexOf(updatedReport);
            let key = "subsection_" + ssid;
            let dataInfo = updatedReport["data"];
            dataInfo[key].images.splice(e, 1);
            updatedReport["data"] = dataInfo;
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

export const updateReportImage = (imgObj, report_id, ssid) => {
    return (dispatch, getState) => {
        let reports = _.cloneDeep(getState().appAllData.reports);
        let updatedReport = _.find(reports,{report_id:report_id});
        if(updatedReport !== undefined){
            let index = reports.indexOf(updatedReport);
            let key = "subsection_" + ssid;
            let data = updatedReport["data"];
            data[key].images.push(imgObj);
            updatedReport["data"] = data;
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


export const updateReportVideoUrl = (e, obj, report_id, ssid) => {
    return (dispatch, getState) => {
        debugger;
        let reports = _.cloneDeep(getState().appAllData.reports);
        let updatedReport = _.find(reports,{report_id:report_id});
        if(updatedReport !== undefined){
            let index = reports.indexOf(updatedReport);
            let key = "subsection_" + ssid;
            let dataInfo = updatedReport["data"];
            dataInfo[key].videos[e] = obj;
            updatedReport["data"] = dataInfo;
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