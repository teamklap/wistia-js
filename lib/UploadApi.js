'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Requester = require('./Requester');

var _Requester2 = _interopRequireDefault(_Requester);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* @module
* @description
* Wistia Uplaod API => https://wistia.com/doc/upload-api
*/
class UploadApi {
	constructor(apiKey, options) {
		options.apiName = 'upload';
		this.requester = new _Requester2.default(apiKey, options);
	}
	/**
 * Uploads a video to Wistia
 *
 * @returns {Promise.<WistiaData>}
 */
	upload(params) {
		if (typeof params.file === "undefined" && typeof params.url === "undefined" || typeof params.file !== "undefined" && typeof params.url !== "undefined") {
			throw new Error('Please provide either file or url path!');
		}

		const formEncoding = typeof params.file !== "undefined" ? 'form-data' : 'x-www-form-urlencoded';

		return this.requester.buildQuery('', params, { reqMethod: 'POST', formEncoding });
	}
}
exports.default = UploadApi;