/**
 * Created by swamy on 25/3/17.
 */


import React from 'react';
import axios from 'axios';
import querystring from 'querystring';


var helpers = {


    getOldStepsByStepId(stepId) {
        return axios.get('/NHBooksCMS/admin/getOldSteps.action?stepId=' + stepId);
    },

    login(data){
        return axios({
            method: 'post',
            url: 'http://localhost:8090/login',
            data: data
        });
    },

    signup(data) {
        return axios({
            method: 'post',
            url: 'http://localhost:8090/signup',
            data: data
        });
    },

    getUserInfo(authHeader) {
        return axios({
            method: 'get',
            url: 'http://localhost:8091/verifyToken',
            headers: {"Authentication" : authHeader}
        });
        // return axios.get('http://localhost:8091/verifyToken');
    }

};

module.exports = helpers;