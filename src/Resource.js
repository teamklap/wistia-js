export default class Resource {
	constructor(resourceName, requester) {
		this.resourceName = resourceName;
		this.requester = requester;
	}
	list(pagingAndSorting) {
		return this.requester.buildQuery(this.resourceName, pagingAndSorting);
	}
	show(hashedItemId) {
		return this.requester.buildQuery(this.resourceName + '/' + hashedItemId);
	}
	create(data) {
		return this.requester.buildQuery(this.resourceName, data, {reqMethod: 'POST'});
	}
	update(hashedItemId, itemData) {
		return this.requester.buildQuery(this.resourceName + '/' + hashedItemId, {}, {reqMethod: 'PUT'});
	}
	delete(hashedItemId) {
		return this.requester.buildQuery(this.resourceName + '/' + hashedItemId, {}, {reqMethod: 'DELETE'});
	}
	copy(hashedItemId, options) {
		// TODO /copy
		return this.requester.buildQuery(this.resourceName, data, {reqMethod: 'POST'});
	}
}
