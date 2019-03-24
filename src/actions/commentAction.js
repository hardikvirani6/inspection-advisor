import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    SET_COMMENT,
    GET_COMMENT,
    SET_ALL_COMMENTS
} from './type';
import Constant from '../helper/constant'
let _ = require('lodash');


export const getComment = (subSectionID) => {
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
            return CallApi(Constant.baseurl+Constant.comments+ subSectionID,'get',{},{"Authorization":header1})
                .then((response)=> {

                    dispatch({
                        type: SET_COMMENT,
                        payload: response.comments,
                    });
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};


export const addComment = (comment,subsectionID) => {
    return (dispatch, getState) => {
        let key = 'subsection_' + subsectionID;
        let comments = _.cloneDeep(getState().appAllData.comments);
        if (comments.hasOwnProperty(key)) {
            comments[key].push(comment)
        } else {
            comments[key] = [comment]
        }
        dispatch({
            type: SET_ALL_COMMENTS,
            payload: comments,
        });
        return Promise.resolve(true);
    };
};


export const filterComment = (commentText,subSectionID) => {
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
            return CallApi(Constant.baseurl+Constant.filterComment + commentText + "&subsectionId=" + subSectionID,'get',{},{"Authorization":header1})
                .then((response)=> {
                    dispatch({
                        type: SET_COMMENT,
                        payload: response.comments,
                    });

                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};


export const deleteComment = (commentID,subsectionID) => {
    return (dispatch, getState) => {
        let key = 'subsection_' + subsectionID;
        let comments = _.cloneDeep(getState().appAllData.comments);
        let filteredComment = comments[key];

        _.remove(filteredComment,{id: commentID});
        comments[key] = filteredComment;

        dispatch({
            type: SET_ALL_COMMENTS,
            payload: comments,
        });
        return Promise.resolve(comments);
    };
};