import Requester from './Requester';

/*
* @module
* @description
* Wistia Uplaod API => https://wistia.com/doc/upload-api
*/
export default class UploadApi {
	constructor(apiKey, options) {
		options.apiName = 'upload';
		this.requester = new Requester(apiKey, options);
	}
	/**
	* Uploads a video to Wistia
	*
	* @returns {Promise.<WistiaData>}
	*/
	upload(params) {
		if ((typeof params.file === "undefined" && typeof params.url === "undefined") ||
			(typeof params.file !== "undefined" && typeof params.url !== "undefined")) {
			throw new Error('Please provide either file or url path!');
		}

		const formEncoding = typeof params.file !== "undefined" ? 'form-data' : 'x-www-form-urlencoded';

		return this.requester.buildQuery('', params, {reqMethod: 'POST', formEncoding});
	}
}
