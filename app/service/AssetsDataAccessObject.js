import DataAccessObject from "./DataAccessObject.js";

export default class ClientsDataAccessObject extends DataAccessObject {
	constructor() {
		super()
	}

	_getCollection(driver, query) {
		return driver.assets.asset()
			.getAll(query)
			.then(function(result) {
				return result.data;
			});
	}

	_updateResource(driver, id: string, data) {
		data.id = id;
		return driver.assets.asset().create(data)
	}

	_getResource(driver, id: string) {
		return dirver.assets.asset(id).get()
			.then(function (result) {
				return result.data
			})
	}

}
