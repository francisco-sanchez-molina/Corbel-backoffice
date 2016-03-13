import alt from "../alt.js";
import CorbelVersionActions from "../actions/CorbelVersionActions";
import corbelService from "../service/CorbelService.js";
import CorbelStore from "./CorbelStore";
import corbel from "corbel-js";

class CorbelVersionStore {

	constructor() {
		this.bindActions(CorbelVersionActions)
		this.state = {}
		this.corbelStore = CorbelStore
	}

	getModuleEndpoint(module) {
		var urlBase = corbelService.getDriver().config.config.urlBase
		return urlBase.replace('{{module}}', module).replace(/\/v.*/,'')
	}

	onRefresh() {
		var modules = ['iam', 'resources']

		var args = {
			url: this.getModuleEndpoint('iam') + '/version',
			method: corbel.request.method.GET
		};
		corbel.request.send(args)
			.then(function(result) {
				console.log(result);
			})
		console.log('refresh!')

	}


}

export default alt.createStore(CorbelVersionStore, 'CorbelVersionStore');
