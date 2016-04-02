import DataAccessObject from "./DataAccessObject.js";

export default class ClientsDataAccessObject extends DataAccessObject {
	constructor() {
		super()
	}

	_getCollection(driver, query) {
		return driver.iam.client(driver.config.config.domain)
			.getAll(query)
			.then(function(result) {
				return result.data;
			});
	}

	_updateResource(driver, id: string, data) {
		return driver.iam.client(id).update(data)
	}

	_getResource(driver, id: string) {
		return dirver.iam.client(id).get()
			.then(function (result) {
				return result.data
			})
	}

}
