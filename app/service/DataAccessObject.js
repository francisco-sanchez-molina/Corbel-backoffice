import corbelService from "./CorbelService.js";

export default class DataAccessObject {
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

	updateResource(oldData: object, newData: object) {
		return this._updateResource(oldData.id, newData);
	}

	getResource(id: string) {
		return this._getResource(id);
	}
	setQuery(query: object) {
		this.apiQuery = query;
	}

}
