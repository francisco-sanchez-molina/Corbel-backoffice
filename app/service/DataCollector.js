import corbelService from "./CorbelService.js";

export default class DataCollector {
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

		if(this.apiQuery) {
			query.query = [this.apiQuery];
		}

		return this.collectionProcessor(query);
	}

	setQuery(query: object) {
		this.apiQuery = query;
	}

}
