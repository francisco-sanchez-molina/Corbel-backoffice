export default class CorbelSession {
	constructor() {
    this.state={};
		this.state.defaultProfileId = 'default';
	}

  serialize(): ? string {
    return JSON.stringify(this.state);
  }

  deserialize(state: string): ? CorbelSession {
    this.state = JSON.parse(state);
    return this;
  }

	setProfile(profileId: string): ? CorbelConfig {
		this.state.defaultProfileId = profileId;
		return this;
	}

	getProfile(): ? string {
		return this.state.defaultProfileId;
	}

  setToken(token: string): ? CorbelSession {
    this.state.token = token;
    return this;
  }

  getToken(): ? string {
    return this.state.token;
  }

	getTokenInfo(): ? string {
		var token = this.getToken();
		var tokenInfo;
		try{
			tokenInfo = JSON.parse(window.atob(token.split('.')[0]));
		} catch(error) {
			tokenInfo = {};
		}
		return tokenInfo;
	}

	setRefreshToken(refreshToken: string): ? CorbelSession {
		this.state.refreshToken = refreshToken;
		return this;
	}

	getRefreshToken(): ? string {
		return this.state.refreshToken;
	}

}
