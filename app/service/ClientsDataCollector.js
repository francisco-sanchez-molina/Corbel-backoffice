import corbelService from "./CorbelService.js";
import DataCollector from "./DataCollector.js";

export default class ClientsDataCollector extends DataCollector {
	constructor() {
		super()
	}

	collectionProcessor(query) {
		return corbelService.getClients(query);
	}

	totalPages() {
		return 10;
	}

}
