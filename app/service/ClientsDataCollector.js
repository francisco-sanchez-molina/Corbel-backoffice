import corbelService from "./CorbelService.js";

export default class ClientsDataCollector {
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

		return corbelService.getClients(query);
	}

	totalPages() {
		return 10;
	}

}
