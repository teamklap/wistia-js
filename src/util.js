import request from 'request';
import Debug from 'debug';

const debug = Debug('wistiajs:util');

const WISTIA_API_URL = {
	data: 'https://api.wistia.com/',
	upload: 'https://upload.wistia.com/'
}

/*
* @module
* @description
* Request utils for module
*/
export default class Util {
	constructor(apiKey, {apiName, apiVersion = 'v1', responseFormat = 'json'}) {
		/**
		 * Builds the first part of a Wistia API url
		 *
		 * URLs looks like e.g. https://api.wistia.com/v1/medias.json?api_password=xyz123
		 *
		 * @param  {string} endPoint Requested resource on the API
		 * @return {string} url Corresponds to the Wistia api type and the end point requested
		 */
		this._buildUrl = (endPoint) => {
			let url = WISTIA_API_URL[apiName];

			if (apiName !== 'upload') {
				url += apiVersion + '/' + endPoint + "." + responseFormat;
			}

			return url += `?api_password=${apiKey}&`;
		}
	}

	buildQuery(endPoint, params = {}, {reqMethod = 'GET', formEncoded = false} = {}) {
		let url = this._buildUrl(endPoint);

		if (formEncoded) {
			return this._sendRequestUrlEncoded(url, params);
		}

		// Set params
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

	/*
	 * @param API url {String}
	 * @param Callback {any}
	 */
	_sendRequest(url, method) {
		debug(`Requesting ${method} ${url}`);
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
		debug(`Posting form-data to ${url}`);
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
