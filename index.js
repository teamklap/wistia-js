"use strict";

const DataApi = require('./lib/DataApi').default;
const UploadApi = require('./lib/UploadApi').default;
const debug = require('debug-levels')('wistiajs:index');

/*
 * @module
 * @description
 * Main entry point for all Wistia APIs
 */
module.exports = function (apiPassword, {apiVersion = 'v1', responseFormat = 'json'} = {}) {
    if (!apiPassword) {
        throw new Error('No API password provided!');
    }

    debug.verbose(`Wistiajs: api version: ${apiVersion}, response format: ${responseFormat}`);

    return {
        // Data API ==> https://wistia.com/doc/data-api
        dataApi: function () {
            return new DataApi(apiPassword, {apiName: 'data', apiVersion, responseFormat})
        },
        // Upload API ==> https://wistia.com/doc/upload-api
        uploadApi: function () {
            return new UploadApi(apiPassword, {apiName: 'upload', apiVersion, responseFormat})
        }
    }
}
