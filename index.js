"use strict";

const DataApi = require('./lib/DataApi').default;
const UploadApi = require('./lib/UploadApi').default;

/*
 * @module
 * @description
 * Main entry point for all Wistia APIs
 */
module.exports = function (apiKey, {apiVersion = 'v1', responseFormat = 'json'} = {}) {
    if (!apiKey) {
        throw new Exception('No key provided!');
    }

    console.log('config', apiVersion, responseFormat)

    return {
        //Data API ==> https://wistia.com/doc/data-api
        dataApi: function () {
            return new DataApi(apiKey, {apiName: 'data', apiVersion, responseFormat})
        },
        //Upload API ==> https://wistia.com/doc/upload-api
        uploadApi: function () {
            return new UploadApi(apiKey, {apiName: 'upload', apiVersion, responseFormat})
        }
    }

}
