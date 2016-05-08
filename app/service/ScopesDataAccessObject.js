import DataAccessObject from './DataAccessObject.js'

export default class ScopesDataAccessObject extends DataAccessObject {
	constructor(scope) {
		super()
		this.scope = scope
	}

	_getCollection(driver, query) {
		return driver.iam.scope(this.scope).get()
				.then(function(result) {
					return [result.data]
				})
	}

	_updateResource(driver, id: string, data) {
		return driver.iam.scope(id).create(data)
	}

	_getResource(driver, id: string) {
		return driver.iam.scope(id).get()
			.then(function (result) {
				return result.data
			})
	}

}
