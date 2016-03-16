import corbelService from "./CorbelService.js";
import DataAccessObject from "./DataAccessObject.js";

export default class ClientsDataAccessObject extends DataAccessObject {
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
