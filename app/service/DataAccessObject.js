import corbelService from "./CorbelService.js";

export default class DataAccessObject {
	constructor() {
		this.pageSize = 20
	}

  hasDriver() {
		return corbelService.getDriver()
	}

	getPageSize() {
		return this.pageSize
	}

	getTotalElements() {
		var params = {
			aggregation: {
				'$count': '*'
			}
		}
		if (this.apiQuery) {
			params.query = [this.apiQuery];
		}
		return this._getCollection(params);
	}

	fetchPage(page: int) {
		var that = this;
		var query = {
			pagination: {
				page: page,
				pageSize: this.pageSize
			}
		};

		if (this.apiQuery) {
			query.query = [this.apiQuery];
		}

		return this._getCollection(query);
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
