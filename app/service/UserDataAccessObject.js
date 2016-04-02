import DataAccessObject from "./DataAccessObject.js";

export default class UserDataAccessObject extends DataAccessObject {
	constructor() {
		super()
	}

	_getCollection(driver, query) {
		return driver.iam.users().get(query)
				.then(function(result) {
					return result.data;
				})
	}

	_updateResource(driver, id: string, data) {
		return driver.iam.user(id).update(data)
	}

	_getResource(driver, id: string) {
		return driver.iam.user(id).get()
			.then(function (result) {
				return result.data
			})
	}

}
