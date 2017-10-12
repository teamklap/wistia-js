/*
 * @module
 * @description
 * Wistia Uplaod API => https://wistia.com/doc/upload-api
 */

module.exports = function (apiKey, options) {
    options.api = 'upload';
    var _util = require('./util.js')(apiKey, options);

    var WistiaUpload = {
        /**
         * Uploads a video to Wistia
         *
         * @returns {Promise.<}
         */
        upload: function (params) {
			return new Promise((resolve, reject) => {
				if (params) {
					params._method = 'POST';
				}

				params.formEncoded = true;

				if (typeof params.file != "undefined" || typeof params.url != "undefined") {
					_util.buildQuery('', params, function (error, data) {
						if (error) reject(error);
						resolve(data);
					});
				} else {
					reject(new Error('Please provide file or url path!'));
				}
			});
        }
    }

    return WistiaUpload;
};
