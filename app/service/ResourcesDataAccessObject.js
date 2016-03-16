import corbelService from "./CorbelService.js";
import DataAccessObject from "./DataAccessObject.js";

export default class ResourcesDataAccessObject extends DataAccessObject {
	constructor(collection) {
		super()
		this.collection = collection;
	}

	collectionProcessor(query) {
		return corbelService.getCollection(this.collection, query);
	}

	totalPages() {
		return 10;
	}

}
