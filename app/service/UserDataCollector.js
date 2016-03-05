import corbelService from "./CorbelService.js";

export default class UserDataCollector {
	constructor() {
		this.pageSize = 20;
	}

	fetchPage(page: int) {
		var that = this;
		var query = {
			pagination: {
				page: page,
				pageSize: this.pageSize
			}
		};

		return corbelService.getUsers(query);
	}

	totalPages() {
		return 10;
	}

}
