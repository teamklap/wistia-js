"use strict";

const WistiaData = require('./lib/data').default;
// import WistiaData from './lib/data';
// import WistiaUpload from
/*
 * @module
 * @description
 * Main entry point for all Wistia APIs
 */
module.exports = function (apiKey, {apiVersion = 'v1', responseFormat = 'json'} = {}) {
    if (!apiKey) {
        throw new Exception('No key provided!');
    }

    // opts = opts || {};
	//
    // var options = {
    //     version: opts.version || 'v1',
    //     format: opts.format || 'json'
    // };
    //
    console.log('config', apiVersion, responseFormat)

    return {
        //Data API ==> https://wistia.com/doc/data-api
        WistiaData: function () {
            return new WistiaData(apiKey, {apiName: 'data', apiVersion, responseFormat})
        },
        //Upload API ==> https://wistia.com/doc/upload-api
        WistiaUpload: function () {
            return require('./lib/upload')(apiKey, {apiName: 'upload', apiVersion, responseFormat})
        }
    }

}
