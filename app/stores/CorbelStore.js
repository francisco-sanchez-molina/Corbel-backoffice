import alt from "../alt.js";
import CorbelActions from "../actions/CorbelActions";

import BackofficeCorbel from "../model/BackofficeCorbel.js"
import CorbelService from "../service/CorbelService"

class CorbelStore {

	constructor() {
		this.bindActions(CorbelActions);
		this.loginInProgress = false
		this.sendEventInProgress = false
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
			.addProfile(state.profileName)
		this.backofficeCorbel.getCorbelConfig()
			.setClientId(state.profileName, state.clientId)
			.setClientSecret(state.profileName, state.clientSecret)
			.setLogin(state.profileName, state.login)
			.setPassword(state.profileName, state.password)
			.setDeviceId(state.profileName, state.deviceId)
		this.toSessionStorage()
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
			.setEnvironment(state.environment)
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

	onRequestLogin() {
		this.loginInProgress = true
	}

	onCancelLogin() {
		this.loginInProgress = false
	}

	onNewLogin({token, refresh}) {
		this.loginInProgress = false
		this.backofficeCorbel.getCorbelSession()
			.setToken(token)
			.setRefreshToken(refresh)
		this.toSessionStorage()
	}

	onErrorOnLogin({error}) {
		this.loginInProgress = false
		this.backofficeCorbel.getCorbelSession()
			.setToken(undefined)
			.setRefreshToken(undefined)
		this.toSessionStorage()
	}

	onSendEvent() {
		this.sendEventInProgress = true
	}

	onEventSended() {
		this.sendEventInProgress = false
		this.sendEventResult = 'Ok!'
	}

	onEventSendFailed({error}) {
		this.sendEventInProgress = false		
		this.sendEventResult = error 
	}

	onCancelSendEvent() {
		this.sendEventInProgress = false		
		this.sendEventResult = 'Canceled'
	}
}

export default alt.createStore(CorbelStore, 'CorbelStore');
