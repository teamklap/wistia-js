import Debug from 'debug-levels';
const debug = Debug('wistiajs:Resource');

/**
 * A Resource represents a single Wistia API endpoint.
 *
 * E.g. https://api.wistia.com/v1/projects.json
 *
 * @type {Object.<Resource>}
 */
export default class Resource {
	/**
	 * @param  {string} resourceName     			Name of the API endpoint
	 * @param  {Object.<Requester>} requester		Utility class to build the requests
	 * @param  {Array.<string>} supportedMethods 	Methods supported by this resource
	 * @return {Object.<Resource>}                  Resource instance
	 */
	constructor(resourceName, requester, supportedMethods) {
		this.resourceName = resourceName;
		this.requester = requester;

		this._setUpMethods(supportedMethods);
	}

	/**
	 * Dynamically attaches methods to the instance of this class
	 * @param {Array.<string>} supportedMethods The methods supported by the resource
	 */
	_setUpMethods(supportedMethods) {
		const methods = {
			list: (pagingAndSorting) => {
				return this.requester.buildQuery(this.resourceName, pagingAndSorting);
			},
			show: (hashedItemId) => {
				return this.requester.buildQuery(this.resourceName + '/' + hashedItemId);
			},
			create: (data) => {
				return this.requester.buildQuery(this.resourceName, data, {reqMethod: 'POST'});
			},
			update: (hashedItemId, itemData) => {
				return this.requester.buildQuery(this.resourceName + '/' + hashedItemId, {}, {reqMethod: 'PUT'});
			},
			delete: (hashedItemId) => {
				return this.requester.buildQuery(this.resourceName + '/' + hashedItemId, {}, {reqMethod: 'DELETE'});
			},
			copy: (hashedItemId, options) => {
				// TODO /copy
				return this.requester.buildQuery(this.resourceName, data, {reqMethod: 'POST'});
			}
		}

		supportedMethods.forEach(method => {
			if (typeof methods[method] === 'undefined') debug.warn(`Method "${method}" on resource "${this.resourceName}" not implemented`);
			this[method] = methods[method];
		});
	}
}
