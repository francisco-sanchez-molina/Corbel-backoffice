import corbelService from "./CorbelService.js";
import DataCollector from "./DataCollector.js";

export default class UserDataCollector extends DataCollector {
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
