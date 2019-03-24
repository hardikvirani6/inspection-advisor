import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    APP_SET_USER_DATA,
    USER_EMAIL_CHANGED,
    USER_PASS_CHANGED,
    USER_LOGOUT, SET_NETWORK_STATE
} from './type';
import Constant from '../helper/constant'
import {getAllData} from './getAllDataAction';

export const loginUser = (email, password) => {
    return (dispatch, getState) => {
        return CallApi(Constant.baseurl+Constant.signin,'post',{"email":email,"password":password,"isMobile":true},{})
            .then((response)=> {
                debugger
                let user = {
                    email:email,
                    password:password,
                    token:response.data.token,
                    username:response.data.user.username,
                    organization_id: response.data.user.organization_id,
                    profileimage:response.data.user.image_path,
                };
                AsyncStorage.setItem('user',JSON.stringify(user));
                return Promise.all([
                    dispatch({
                        type: APP_SET_USER_DATA,
                        payload: response.data,
                    }),
                    // dispatch(getAllData())
                ]).then(res=>{
                    dispatch(getAllData());
                    return Promise.resolve(response);
                })
            })
            .catch((error)=>{
                return Promise.reject(error);
            })
    };
};

export const emailChanged = (text) => {
    return { type: USER_EMAIL_CHANGED, payload: text };
};

export const stopLoading = (text) => {
    return { type: STOP_LOADING, payload: text };
};

export const passChanged = (text) => {
    return { type: USER_PASS_CHANGED, payload: text };
};

export const setUserLogout = (isNetwork) => {
    return (dispatch, getState) => {
        return AsyncStorage.removeItem('user', (err) => {
            dispatch({
                type: USER_LOGOUT
            });

            dispatch({
                type: SET_NETWORK_STATE,
                payload: isNetwork,
            });
            return Promise.resolve(true);
        })
    };
};