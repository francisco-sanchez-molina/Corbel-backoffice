export default class CorbelSession {
	constructor() {
    this.state={};
	}

  serialize(): ? string {
    return JSON.stringify(this.state);
  }

  deserialize(state: string): ? CorbelSession {
    this.state = JSON.parse(state);
    return this;
  }

  setToken(token: string): ? CorbelSession {
    this.state.token = token;
    return this;
  }

  getToken(): ? string {
    return this.state.token;
  }

}
