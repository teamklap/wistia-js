import request from 'request';
import Debug from 'debug-levels';

const debug = Debug('wistiajs:util');

/*
* @module
* @description
*/
export default class Requester {
	constructor(apiKey, {apiName, apiVersion = 'v1', responseFormat = 'json'}) {
		/**
		 * Builds the first part of a Wistia API url
		 *
		 * URLs looks like e.g. https://api.wistia.com/v1/medias.json?api_password=xyz123
		 * or https://api.wistia.com/v1/projects/<project-id>/sharings.json
		 *
		 * @param  {string} endPoint Requested resource on the API
		 * @return {string} url Corresponds to the Wistia api type and the end point requested
		 */
		this._buildUrl = (endPoint) => {
			// The Data API URL does not contain the API name
			if (apiName === 'data') apiName = '';

			if (apiName === 'upload') {
				return `https://upload.wistia.com/?api_password=${apiKey}&`
			}

			return `https://api.wistia.com/${apiVersion}/${apiName}/${endPoint}.${responseFormat}?api_password=${apiKey}&`;
		}
	}

	buildQuery(endPoint, params = {}, {reqMethod = 'GET', formEncoding = false} = {}) {
		let url = this._buildUrl(endPoint);

		if (formEncoding) {
			return this._sendRequestForm(url, params, formEncoding);
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
		debug(`Request ${method} ${url}`);
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
	_sendRequestForm(url, form, formEncoding) {
		debug(`Posting ${formEncoding} to ${url}`);
		return new Promise((resolve, reject) => {
				const options = {url};

				// Send request either form-data or x-www-form-urlencoded as default
				options[formEncoding === 'form-data' ? 'formData' : 'form'] = form;

				request.post(options, function (error, response, body) {
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
