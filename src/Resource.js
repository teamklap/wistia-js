export default class Resource {
	constructor(resourceName, requester) {
		this.resourceName = resourceName;
		this.requester = requester;
	}
	list() {
		return this.requester.buildQuery(this.resourceName);
	}
	create(data) {
		return this.requester.buildQuery(this.resourceName, data, {reqMethod: 'POST'});
	}
	update(itemId, itemData) {
		return this.requester.buildQuery(this.resourceName + '/' + itemId, data, {reqMethod: 'PUT'});
	}
	delete(itemId) {
		return this.requester.buildQuery(this.resourceName, data, {reqMethod: 'DELETE'});
	}
	copy(itemId, options) {
		// TODO /copy
		return this.requester.buildQuery(this.resourceName, data, {reqMethod: 'POST'});
	}
}
