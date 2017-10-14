/*
 * @module
 * @description
 * Wistia Uplaod API => https://wistia.com/doc/upload-api
 */
import Util from './util';

module.exports = function (apiKey, options) {
    options.apiName = 'upload';
    const _util = new Util(apiKey, options);

    const WistiaUpload = {
        /**
         * Uploads a video to Wistia
         *
         * @returns {Promise.<WistiaData>}
         */
        upload: (params) => {
			if (typeof params.file === "undefined" && typeof params.url === "undefined") {
				throw new Error('Please provide file or url path!');
			}

			return _util.buildQuery('', params, {reqMethod: 'POST', formEncoded: true});
    	}
	}

    return WistiaUpload;
};
