export default class CorbelConfig {
	constructor() {
		this.deserialize('{}');
	}

  serialize(): ? string {
    return JSON.stringify(this.state);
  }

  deserialize(state: string): ? CorbelConfig {
    this.state = JSON.parse(state);
		this.state.profiles = this.state.profiles || {default:{}};
		this.state.defaultProfileId = this.state.defaultProfileId || 'default';
    return this;
  }

  setDefaultProfile(profileId: string): ? CorbelConfig {
    this.state.defaultProfileId = profileId;
    return this;
  }

	getDefaultProfile(): ? string {
		return this.state.defaultProfileId;
	}

	deleteProfile(name) : ? CorbelConfig {
		delete this.state.profiles[name];
		return this;
	}

  setClientId(profileName, clientId: string): ? CorbelConfig {
		this.state.profiles[profileName].clientId = clientId;
    return this;
  }

  getClientId(profileName): ? string {
		profileName = profileName || this.state.defaultProfileId;
		return this.state.profiles[profileName].clientId;
  }

  setClientSecret(profileName, clientSecret: string): ? CorbelConfigProfile {
		this.state.profiles[profileName].clientSecret = clientSecret;
    return this;
  }

  getClientSecret(profileName): ? string {
		profileName = profileName || this.state.defaultProfileId;
    return this.state.profiles[profileName].clientSecret;
  }

  setUrlBase(profileName, urlBase: string): ? CorbelConfigProfile {
    this.state.profiles[profileName].urlBase = urlBase;
    return this;
  }

  getUrlBase(profileName): ? string {
		profileName = profileName || this.state.defaultProfileId;
    return this.state.profiles[profileName].urlBase;
  }

	setLogin(profileName, login: string): ? CorbelConfigProfile {
		profileName = profileName || this.state.defaultProfileId;
		this.state.profiles[profileName].login = login;
    return this;
  }

  getLogin(profileName): ? string {
		profileName = profileName || this.state.defaultProfileId;
		return this.state.profiles[profileName].login;
  }

	setPassword(profileName, password: string): ? CorbelConfigProfile {
		this.state.profiles[profileName].password = password;
    return this;
  }

  getPassword(profileName): ? string {
		profileName = profileName || this.state.defaultProfileId;
		return this.state.profiles[profileName].password;
  }

	setDevice(profileName, device: string): ? CorbelConfigProfile {
    this.state.profiles[profileName].device = device;
    return this;
  }

  getDevice(profileName): ? string {
		profileName = profileName || this.state.defaultProfileId;
    return this.state.profiles[profileName].device;
  }

  getProfiles(): ? string {
    return this.state.profiles;
  }

	addProfile(profileName) {
		this.state.profiles[profileName] = this.state.profiles[profileName] || {};
		return this;
	}

	getProfileNames(): ? string {
    return Object.keys(this.state.profiles);
  }

}
