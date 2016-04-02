import DataAccessObject from "./DataAccessObject.js";

export default class ResourcesDataAccessObject extends DataAccessObject {
	constructor(collection) {
		super()
		this.collection = collection;
	}

	_getCollection(driver, query) {
		return driver.resources.collection(this.collection)
			.get(query)
			.then(function(result) {
				return result.data;
			});
	}

	_updateResource(driver, id: string, data) {
		return driver.resources.resource(this.collection, id).update(data)
	}

	_getResource(driver, id: string) {
		return dirver.resources.resource(this.collection, id).get()
			.then(function (result) {
				return result.data
			})
	}

}
