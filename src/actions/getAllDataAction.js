import React, { Component } from 'react';
import { CallApi } from '../services/apiCall';
import {
    SET_ALL_REPORTS,
    SET_ALL_COMMENTS,
    SET_ALL_TEMPLATES,
    SET_APP_DATA_LOADER,
    SET_NETWORK_STATE
} from './type';

//Get App response
export const getAllData = () => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_APP_DATA_LOADER,
            payload: false,
        });

        let token = "Bearer " + getState().userlogin.token;
        return CallApi("http://staging-api.inspectionadvisor.com/api/v1/reporttemplate/export" ,'get',{},
            {"Authorization":token})
            .then((response)=> {
                if(response.reports){
                    dispatch({
                        type: SET_ALL_REPORTS,
                        payload: response.reports,
                    });
                }
                if(response.comments){
                    dispatch({
                        type: SET_ALL_COMMENTS,
                        payload: response.comments,
                    });
                }
                if(response.schema){

                    if(response.schema.templates){
                        dispatch({
                            type: SET_ALL_TEMPLATES,
                            payload: response.schema.templates,
                        });
                    }
                }

                dispatch({
                    type: SET_APP_DATA_LOADER,
                    payload: true,
                });

                return Promise.resolve(response);
            })
            .catch((error)=>{
                dispatch({
                    type: SET_APP_DATA_LOADER,
                    payload: false,
                });
                return Promise.reject(error);
            });
    };
};

export const setNetworkState = (state) => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_NETWORK_STATE,
            payload: state,
        });
    }
};