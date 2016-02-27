export default class CorbelConfig {
	constructor() {
    this.state={};
	}

  serialize(): ? string {
    return JSON.stringify(this.state);
  }

  deserialize(state: string): ? CorbelConfig {
    this.state = JSON.parse(state);
    return this;
  }

  setClientId(clientId: string): ? CorbelConfig {
    this.state.clientId = clientId;
    return this;
  }

  getClientId(): ? string {
    return this.state.clientId;
  }

  setClientSecret(clientSecret: string): ? CorbelConfig {
    this.state.clientSecret = clientSecret;
    return this;
  }

  getClientSecret(): ? string {
    return this.state.clientSecret;
  }

  setUrlBase(urlBase: string): ? CorbelConfig {
    this.state.urlBase = urlBase;
    return this;
  }

  getUrlBase(): ? string {
    return this.state.urlBase;
  }

}
