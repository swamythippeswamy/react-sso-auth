/**
 * Created by swamy on 25/3/17.
 */


import React from 'react';
import axios from 'axios';
import querystring from 'querystring';


var AUTH_SERVER_BASE_URL = "https://sso-server.herokuapp.com/";

var AUTH_AGENT_BASE_URL = "https://sso-agent-test.herokuapp.com/";

var helpers = {


    login(data){
        return axios({
            method: 'post',
            url: AUTH_SERVER_BASE_URL + '/login',
            data: data
        });
    },

    signup(data) {
        return axios({
            method: 'post',
            url: AUTH_SERVER_BASE_URL + '/signup',
            data: data
        });
    },

    getUserInfo(authHeader) {
        return axios({
            method: 'get',
            url: AUTH_AGENT_BASE_URL + 'verifyToken',
            headers: {"Authentication" : authHeader}
        });
        // return axios.get('http://localhost:8091/verifyToken');
    }

};

module.exports = helpers;