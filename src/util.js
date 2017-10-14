import request from 'request';
import Debug from 'debug';

const debug = Debug('wistiajs:util');

const WISTIA_UPLOAD_URL = 'https://upload.wistia.com/';
const WISTIA_DATA_URL = 'https://api.wistia.com/'

/*
* @module
* @description
* Request utils for module
*/
export default class Util {
	constructor(apiKey, {apiName, apiVersion = 'v1', responseFormat = 'json'}) {
		this._buildUrl = (endPoint) => {
			let url;

			switch (apiName) {
				case 'upload':
				url = "https://upload.wistia.com/";
				break;

				case 'data':
				url = "https://api.wistia.com/" + apiVersion + '/' + endPoint + "." + responseFormat;
				break;
			}

			url += "?" + "api_password=" + apiKey + "&";

			return url;
		}
	}

	buildQuery(endPoint, params = {}) {
		let url = this._buildUrl(endPoint);

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
	}

	/*
	 * @param API url {String}
	 * @param Callback {any}
	 */
	_sendRequest(url, method) {
		return new Promise((resolve, reject) => {
			request({
				url: url,
				method: method
			}, function (error, response, body) {
				if (error) {
					return cb(error);
				}

				if (response.statusCode == 200 || response.statusCode == 201) {
					resolve(JSON.parse(body));
				} else {
					reject(new Error(`Server responded with error: ${response.statusCode}. Message: ${JSON.parse(body).error}`));
				}
			})
		})
	}

	/*
	 * @param url {string}
	 * @param FormData {Object}
	 * @param Callback {any}
	 */
	_sendRequestUrlEncoded(url, formData) {
		return new Promise((resolve, reject) => {
			request.post({url: url, formData: formData}, function (error, response, body) {
				if (error) {
					reject(error);
				}

				if (response.statusCode == 200 || response.statusCode == 201) {
					resolve(JSON.parse(body));
				} else {
					reject(new Error(`Server responded with error: ${response.statusCode}. Message: ${JSON.parse(body).error}`));
				}
			});
		});
	}
}
