import corbelService from "./CorbelService.js";
import DataAccessObject from "./DataAccessObject.js";

export default class UserDataAccessObject extends DataAccessObject {
	constructor() {
		super()
	}

	collectionProcessor(query) {
		return corbelService.getUsers(query);
	}

	totalPages() {
		return 10;
	}

}
