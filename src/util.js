/*
 * @module
 * @description
 * Request utils for module
 */

var request = require('request');

module.exports = function (apiKey, options) {
    return {
        /*
         * @param API endopint {String}
         * @param Params {Object}
         * @param Callback {any}
         */
        buildQuery: function (endPoint, params) {
            // Build url
            let url;

            switch (options.api) {
                case 'upload':
                    url = "https://upload.wistia.com/";
                    break;

                case 'data':
                    url = "https://api.wistia.com/" + options.version + '/' + endPoint + "." + options.format;
                    break;
            }

            url += "?" + "api_password=" + apiKey + "&";

            let reqMethod = 'GET';

            if (typeof params._method != "undefined") {
                reqMethod = params._method;

                delete params._method;
            }

            if (typeof params.formEncoded != 'undefined') {
                delete params.formEncoded;

                return this._sendRequestUrlEncoded(url, params);
            } else {
                //Set params
                if (params) {
                    const paramKeys = Object.keys(params);

                    if (paramKeys.length > 0) {
                        for (let key in paramKeys) {
                            url += paramKeys[key] + "=" + params[paramKeys[key]] + "&";
                        }
                    }
                }

                return this._sendRequest(encodeURI(url), reqMethod);
            }
        },

        /*
         * @param API url {String}
         * @param Callback {any}
         */
        _sendRequest: function (url, method) {
			return new Promise((resolve, reject) => {
				request({
					url: url,
					method: method
				}, function (error, response, body) {
					if (error) {
						return cb(error);
					}

					if (response.statusCode == 200 || response.statusCode == 201) {
						resolve(body);
					} else {
						reject(new Error(`Server responded with error: ${response.statusCode}. Message: ${JSON.parse(body).error}`));
					}
				})
			})
        },

        /*
         * @param url {string}
         * @param FormData {Object}
         * @param Callback {any}
         */
        _sendRequestUrlEncoded: function (url, formData) {
			return new Promise((resolve, reject) => {
				request.post({url: url, formData: formData}, function (error, response, body) {
					if (error) {
						reject(error);
					}

					if (response.statusCode == 200 || response.statusCode == 201) {
						resolve(null, body);
					} else {
						reject(new Error(`Server responded with error: ${response.statusCode}. Message: ${JSON.parse(body).error}`));
					}
				});
			});
        }
    }

};
