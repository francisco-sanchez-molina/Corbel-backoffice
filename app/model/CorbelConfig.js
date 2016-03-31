export default class CorbelConfig {
	constructor() {
		this.deserialize('{}');
	}

	serialize(): ? string {
		return JSON.stringify(this.state);
	}

	deserialize(state: string): ? CorbelConfig {
		this.state = JSON.parse(state)
		this.state.profiles = this.state.profiles || {}
		this.state.environments = this.state.environments || {}
		return this;
	}

	deleteProfile(name): ? CorbelConfig {
		delete this.state.profiles[name];
		return this;
	}

	deleteEnvironment(name): ? CorbelConfig {
		delete this.state.environments[name]
		return this
	}

	setClientId(profileName, clientId: string): ? CorbelConfig {
		this.state.profiles[profileName].clientId = clientId;
		return this;
	}

	getClientId(profileName): ? string {
		return this.state.profiles[profileName].clientId;
	}

	setClientSecret(profileName, clientSecret: string): ? CorbelConfigProfile {
		this.state.profiles[profileName].clientSecret = clientSecret;
		return this;
	}

	getClientSecret(profileName): ? string {
		return this.state.profiles[profileName].clientSecret;
	}

	setLogin(profileName, login: string): ? CorbelConfigProfile {
		this.state.profiles[profileName].login = login;
		return this;
	}

	getLogin(profileName): ? string {
		return this.state.profiles[profileName].login;
	}

	setPassword(profileName, password: string): ? CorbelConfigProfile {
		this.state.profiles[profileName].password = password;
		return this;
	}

	getPassword(profileName): ? string {
		return this.state.profiles[profileName].password;
	}

	setDevice(profileName, device: string): ? CorbelConfigProfile {
		this.state.profiles[profileName].device = device;
		return this;
	}

	getDevice(profileName): ? string {
		return this.state.profiles[profileName].device;
	}

	getProfiles(): ? string {
		return this.state.profiles;
	}

	addProfile(profileName) {
		this.state.profiles[profileName] = this.state.profiles[profileName] || {}
		return this
	}

	getProfileNames(): ? string {
		return Object.keys(this.state.profiles);
	}

	setEnvironmentUrl(environmentName, url) {
		this.state.environments[environmentName] = this.state.environments[environmentName] || {}
		this.state.environments[environmentName].urlBase = url
		return this
	}

	getEnvironmentUrl(environmentName, url) {
		var content = this.state.environments[environmentName] || {}
		return content.urlBase
	}

	getEnvironmentNames(): ? string {
		return Object.keys(this.state.environments)
	}

}
