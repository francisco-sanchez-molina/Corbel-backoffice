import corbelService from "./CorbelService.js";
import DataAccessObject from "./DataAccessObject.js";

export default class ClientsDataAccessObject extends DataAccessObject {

	constructor() {
		super()
	}

	_getCollection(query) {
		var driver = corbelService.getDriver();
		var domain = driver.config.config.domain;
		if (!domain) {
			return Promise.reject({error: 'Driver has not domain'})
		}
		return driver.iam.client(domain)
			.getAll(query)
			.then(function(result) {
				return result.data;
			});
	}

}
