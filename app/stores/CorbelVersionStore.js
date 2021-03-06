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
		var driver = corbelService.getDriver()
		var urlBase = driver.config.config.urlBase
		return urlBase.replace('{{module}}', module).replace(/\/v.*/, '')
	}

	onSaveVersion(state) {
		this.state[state.module] = state.version
	}

	onRefresh() {
		var modules = ['iam', 'resources', 'assets', 'evci', 'scheduler']
		var that = this
		try {
			modules.forEach(module => {
				var args = {
					url: this.getModuleEndpoint(module) + '/version',
					method: corbel.request.method.GET
				};
				corbel.request.send(args)
					.then(function(result) {
						CorbelVersionActions.saveVersion({
							module: module,
							version: result.data['build.version']
						})
					})
			})
		} catch (error) {}
	}


}

export default alt.createStore(CorbelVersionStore, 'CorbelVersionStore');
