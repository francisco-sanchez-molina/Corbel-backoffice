import corbelService from "./CorbelService.js";
import DataCollector from "./DataCollector.js";

export default class ResourcesDataCollector extends DataCollector {
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
