import corbelService from "./CorbelService.js";

export default class UserDataCollector {
	constructor() {
		this.pageSize = 20;
	}

	newQuery(query: string) {
		query = JSON.parse(query);
		this.apiQuery = query;
	}

	fetchPage(page: int) {
		var that = this;
		var query = {
			pagination: {
				page: page,
				pageSize: this.pageSize
			}
		};

		if(this.apiQuery) {
			query.query = [this.apiQuery];
		}

		return corbelService.getUsers(query);
	}

	totalPages() {
		return 10;
	}

}
