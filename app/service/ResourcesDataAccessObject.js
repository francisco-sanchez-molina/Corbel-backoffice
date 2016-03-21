import corbelService from "./CorbelService.js";
import DataAccessObject from "./DataAccessObject.js";

export default class ResourcesDataAccessObject extends DataAccessObject {

	constructor(collection) {
		super()
		this.collection = collection;
	}

	_getCollection(query) {
		return corbelService.getDriver().resources.collection(this.collection)
			.get(query)
			.then(function(result) {
				return result.data;
			});
	}

	_updateResource(id: string, data) {
		return corbelService.getDriver().resources.resource(this.collection, id)
			.update(data)
	}

	_getResource(id: string) {
		return corbelService.getDriver()
			.resources.resource(this.collection, id).get()
			.then(function (result) {
				return result.data
			})
	}

}
