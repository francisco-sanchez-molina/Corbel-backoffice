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

	onStoreCorbelConfigProfile(state) {
		this.backofficeCorbel.getCorbelConfig()
			.setClientId(state.profileName, state.clientId)
			.setClientSecret(state.profileName, state.clientSecret)
			.setUrlBase(state.profileName, state.urlBase)
			.setLogin(state.profileName, state.login)
			.setPassword(state.profileName, state.password);
		this.toSessionStorage();
	}

	onStoreCorbelConfigEnvironment(state) {
		this.backofficeCorbel.getCorbelConfig()
			.setEnvironmentUrl(state.name, state.urlBase)
		this.toSessionStorage()
	}

	onImportConfiguration(state) {
		this.backofficeCorbel.getCorbelConfig().deserialize(state)
		this.toSessionStorage()
	}

	onSetProfile(state) {
			this.backofficeCorbel.getCorbelConfig().setDefaultProfile(state.name);
			this.toSessionStorage();
	}

	onDeleteCorbelConfigProfile(state) {
		this.backofficeCorbel.getCorbelConfig().deleteProfile(state.name);
		this.toSessionStorage();
	}

	onDeleteCorbelConfigEnvironment(state) {
		this.backofficeCorbel.getCorbelConfig().deleteEnvironment(state.name);
		this.toSessionStorage();
	}

	onStoreCorbelDriver(corbelDriverConfig) {
		this.backofficeCorbel.getCorbelSession()
			.setCorbelDriverConfig(corbelDriverConfig);
		this.toSessionStorage();
	}

	onStoreNewLoginData(state) {
		this.backofficeCorbel.getCorbelSession()
			.setProfile(state.profile)
			.setLogin(state.login)
			.setUrl(state.url);
		this.toSessionStorage();
	}

	onResetLastLoginData() {
		this.backofficeCorbel.getCorbelSession()
			.setToken(undefined)
			.setRefreshToken(undefined)
			.setProfile(undefined)
			.setLogin(undefined)
			.setUrl(undefined);
		this.toSessionStorage();
	}

	onNewLogin(state) {
		this.backofficeCorbel.getCorbelSession()
			.setToken(state.token)
			.setRefreshToken(state.refreshToken)
		this.toSessionStorage()
	}

}

export default alt.createStore(CorbelStore, 'CorbelStore');
