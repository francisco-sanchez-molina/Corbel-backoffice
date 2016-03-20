import corbelService from "./CorbelService.js";
import DataAccessObject from "./DataAccessObject.js";

export default class UserDataAccessObject extends DataAccessObject {
	constructor() {
		super()
	}

	collectionProcessor(query) {
		return corbelService.getUsers(query)
	}

	_updateResource(id: string, data) {
		return corbelService.getDriver().iam.user(id)
			.update(data)
	}

	_getResource(id: string) {
		return corbelService.getDriver()
			.iam.user(id).get()
			.then(function (result) {
				return result.data
			})
	}

	totalPages() {
		return 10
	}

}
