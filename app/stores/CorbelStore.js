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

  onStoreNewProfile(state) {
		this.backofficeCorbel.getCorbelConfig()
			.addProfile(state.profileName);
		this.toSessionStorage();
	}

	onStoreCorbelConfig(state) {
		this.backofficeCorbel.getCorbelConfig()
			.setClientId(state.profileName, state.clientId)
			.setClientSecret(state.profileName, state.clientSecret)
			.setUrlBase(state.profileName, state.urlBase)
			.setLogin(state.profileName, state.login)
			.setPassword(state.profileName, state.password);
		this.toSessionStorage();
	}

	onDeleteCorbelConfigProfile(state) {
		this.backofficeCorbel.getCorbelConfig().deleteProfile(state.name);
		this.toSessionStorage();
	}

	onStoreCorbelDriver(corbelDriver) {
		this.backofficeCorbel.setDriver(corbelDriver);
	}

	onNewLogin(state) {
		this.backofficeCorbel.getCorbelSession()
			.setToken(state.token)
			.setRefreshToken(state.refreshToken);
		this.toSessionStorage();
	}

}

export default alt.createStore(CorbelStore, 'CorbelStore');
