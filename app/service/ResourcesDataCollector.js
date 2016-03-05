import corbelService from "./CorbelService.js";

export default class ResourcesDataCollector {
	constructor(collection) {
		this.pageSize = 20;
		this.collection = collection;
	}

	fetchPage(page: int) {
		var that = this;
		var query = {
			pagination: {
				page: page,
				pageSize: this.pageSize
			}
		};

		return corbelService.getCollection(this.collection, query);
	}

	totalPages() {
		return 10;
	}

}
