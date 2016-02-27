import alt from "../alt.js";
import CorbelActions from "../actions/CorbelActions";
import BackofficeCorbel from "../model/BackofficeCorbel.js"

class CorbelStore {

	constructor() {
		this.bindActions(CorbelActions);
		this.backofficeCorbel = new BackofficeCorbel();
		this.backofficeCorbel.deserialize(localStorage.getItem('CorbelStore') || '{}');
	}

	toSessionStorage() {
		localStorage.setItem('CorbelStore', this.backofficeCorbel.serialize());
	}

	onStoreCorbelConfig(state) {
		this.backofficeCorbel.getCorbelConfig()
			.setClientId(state.clientId)
			.setClientSecret(state.clientSecret)
			.setUrlBase(state.urlBase);
		this.toSessionStorage();
	}

	onStoreCorbelDriver(corbelDriver) {
		this.backofficeCorbel.setDriver(corbelDriver);
	}

	onNewLogin(state) {
		this.backofficeCorbel.getCorbelSession().setToken(state.token);
		this.toSessionStorage();
	}

}

export default alt.createStore(CorbelStore, 'CorbelStore');
