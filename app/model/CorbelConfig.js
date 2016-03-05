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

	getDefaultProfile(): ? CorbelConfig {
		return this.state.defaultProfileId;
	}

  setClientId(profileName, clientId: string): ? CorbelConfig {
		this.state.profiles[profileName].clientId = clientId;
    return this;
  }

  getClientId(profileName): ? string {
		profileName = profileName || this.state.defaultProfileId;
		return this.state.profiles[this.state.defaultProfileId].clientId;
  }

  setClientSecret(profileName, clientSecret: string): ? CorbelConfigProfile {
		this.state.profiles[profileName].clientSecret = clientSecret;
    return this;
  }

  getClientSecret(profileName): ? string {
		profileName = profileName || this.state.defaultProfileId;
    return this.state.profiles[this.state.defaultProfileId].clientSecret;
  }

  setUrlBase(profileName, urlBase: string): ? CorbelConfigProfile {
    this.state.profiles[profileName].urlBase = urlBase;
    return this;
  }

  getUrlBase(profileName): ? string {
		profileName = profileName || this.state.defaultProfileId;
    return this.state.profiles[this.state.defaultProfileId].urlBase;
  }

	setLogin(profileName, login: string): ? CorbelConfigProfile {
		profileName = profileName || this.state.defaultProfileId;
		this.state.profiles[this.state.defaultProfileId].login = login;
    return this;
  }

  getLogin(profileName): ? string {
		profileName = profileName || this.state.defaultProfileId;
		return this.state.profiles[this.state.defaultProfileId].login;
  }

	setPassword(profileName, password: string): ? CorbelConfigProfile {
		this.state.profiles[profileName].password = password;
    return this;
  }

  getPassword(profileName): ? string {
		profileName = profileName || this.state.defaultProfileId;
		return this.state.profiles[this.state.defaultProfileId].password;
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
