/*
 * @module
 * @description
 * Wistia Uplaod API => https://wistia.com/doc/upload-api
 */

module.exports = function (apiKey, options) {
    options.api = 'upload';
    const _util = require('./util.js')(apiKey, options);

    const WistiaUpload = {
        /**
         * Uploads a video to Wistia
         *
         * @returns {Promise.<WistiaData>}
         */
        upload: (params) => {
			if (params) {
				params._method = 'POST';
			}

			params.formEncoded = true;

			if (typeof params.file === "undefined" && typeof params.url === "undefined") {
				throw new Error('Please provide file or url path!');
			}

			return new Promise((resolve, reject) => {
				_util.buildQuery('', params, function (error, response) {
					if (error) reject(error);
					resolve(response);
				});
    		});
    	}
	}

    return WistiaUpload;
};
