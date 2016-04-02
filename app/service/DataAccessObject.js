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
		var driver = corbelService.getDriver();
		var domain = driver.config.config.domain;
		if (!domain) {
			return Promise.reject({error: 'Driver has not domain'})
		}

		var params = {
			aggregation: {
				'$count': '*'
			}
		}
		if (this.apiQuery) {
			params.query = [this.apiQuery];
		}
		return this._getCollection(driver, params);
	}

	fetchPage(page: int) {
		var driver = corbelService.getDriver();
		var domain = driver.config.config.domain;
		if (!domain) {
			return Promise.reject({error: 'Driver has not domain'})
		}

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

		return this._getCollection(driver, query);
	}

	updateResource(oldData: object, newData: object) {
		var driver = corbelService.getDriver();
		var domain = driver.config.config.domain;
		if (!domain) {
			return Promise.reject({error: 'Driver has not domain'})
		}
		return this._updateResource(driver, oldData.id, newData);
	}

	getResource(id: string) {
		var driver = corbelService.getDriver();
		var domain = driver.config.config.domain;
		if (!domain) {
			return Promise.reject({error: 'Driver has not domain'})
		}
		return this._getResource(driver, id);
	}

	setQuery(query: object) {
		this.apiQuery = query;
	}

}
