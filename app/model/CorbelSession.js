export default class CorbelSession {
	constructor() {
    this.state={}
	}

  serialize(): ? string {
    return JSON.stringify(this.state)
  }

  deserialize(state: string): ? CorbelSession {
    this.state = JSON.parse(state)
    return this
  }

	setProfile(profile: string): ? CorbelConfig {
		this.state.profile = profile
		return this
	}

	getProfile(): ? string {
		return this.state.profile
	}

	setEnvironment(environment: string): ? CorbelConfig {
		this.state.environment = environment
		return this
	}

	getEnvironment(): ? string {
		return this.state.environment
	}

  setToken(token: string): ? CorbelSession {
    this.state.token = token
    return this
  }

  getToken(): ? string {
    return this.state.token
  }

	setLogin(login: string): ? CorbelSession {
    this.state.login = login
    return this
  }

  getLogin(): ? string {
    return this.state.login
  }

	setUrl(url: string): ? CorbelSession {
		this.state.url = url
		return this
	}

	getUrl(): ? string {
		return this.state.url
	}

	getTokenInfo(): ? string {
		var token = this.getToken()
		var tokenInfo
		try{
			tokenInfo = JSON.parse(window.atob(token.split('.')[0]))
		} catch(error) {
			tokenInfo = {}
		}
		return tokenInfo
	}

	setRefreshToken(refreshToken: string): ? CorbelSession {
		this.state.refreshToken = refreshToken
		return this
	}

	getRefreshToken(): ? string {
		return this.state.refreshToken
	}

	setCorbelDriverConfig(config) {
		this.state.corbelDriverConfig = config
		return this
	}

	getCorbelDriverConfig() {
		return this.state.corbelDriverConfig
	}
}
