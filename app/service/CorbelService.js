import corbel from "corbel-js";

import CorbelStore from "../stores/CorbelStore"
import CorbelActions from "../actions/CorbelActions"

import AppNotificationActions from "../actions/AppNotificationActions"


class CorbelService {
	constructor() {}

	getDriver() {
		if (!this.driver) {
			var corbelSession = CorbelStore.getState().backofficeCorbel.getCorbelSession();
			var config = corbelSession.getCorbelDriverConfig();
			if (config && config.urlBase) {
				this.driver = corbel.getDriver(config)
			}
		}
		return this.driver;
	}

	createDriver(profileName, environmentName) {
		var corbelConfig = CorbelStore.getState().backofficeCorbel.getCorbelConfig()
		if (!profileName ||
			!corbelConfig.getEnvironmentUrl(environmentName) ||
			!corbelConfig.getClientId(profileName) ||
			!corbelConfig.getClientSecret(profileName)) {
			return undefined
		}

		return corbel.getDriver({
			urlBase: corbelConfig.getEnvironmentUrl(environmentName),
			clientId: corbelConfig.getClientId(profileName),
			clientSecret: corbelConfig.getClientSecret(profileName),
			scopes: ''
		})
	}

	cancelLogin() {
		this.currentLogin = undefined;
		AppNotificationActions.notifyError('Login cancelled')
	}

	login(profileName, environmentName) {
		var params = {}
		var corbelConfig = CorbelStore.getState().backofficeCorbel.getCorbelConfig()

		CorbelActions.resetLastLoginData();

		this.driver = this.createDriver(profileName, environmentName)

		if (!this.driver) {
			AppNotificationActions.notifyError('Misconfigure profile')
			CorbelActions.errorOnLogin('Misconfigure profile')
		}

		CorbelActions.storeCorbelDriver(this.driver.config.config)

		CorbelActions.storeNewLoginData({
			profile: profileName,
			environment: environmentName,
			login: corbelConfig.getLogin(profileName),
			url: corbelConfig.getEnvironmentUrl(environmentName)
		})

		if (corbelConfig.getLogin(profileName) && corbelConfig.getLogin(profileName).length > 0) {
			params.claims = {
				'basic_auth.username': corbelConfig.getLogin(profileName),
				'basic_auth.password': corbelConfig.getPassword(profileName)
			}
		}

		if (corbelConfig.getDevice(profileName) && corbelConfig.getDevice(profileName).length > 0) {
			params.claims['device_id'] = deviceId;
		}

		var currentLogin = Date.now()
		this.currentLogin = currentLogin

		return this.driver.iam.token().create(params)
			.then(result => {
				if (this.currentLogin === currentLogin) {
					AppNotificationActions.notifyError('Logged in ' + environmentName + ' with ' + profileName )
					CorbelActions.newLogin(result.data.accessToken, result.data.refreshToken)
				}
			}).catch(error => {
				if (this.currentLogin === currentLogin) {
					AppNotificationActions.notifyError('Login error: ' + error)
					CorbelActions.errorOnLogin(error)
				}
			})
	}

	loginToken(token, environmentName) {
		var params = {}
		var corbelConfig = CorbelStore.getState().backofficeCorbel.getCorbelConfig()

		CorbelActions.resetLastLoginData();

		var tokenInfo = this.decodeToken(token)
		this.driver = corbel.getDriver({
			urlBase: corbelConfig.getEnvironmentUrl(environmentName),
			domain: tokenInfo.domainId,
			clientId: tokenInfo.clientId,
			iamToken: {
				accessToken: token,
				expiresAt: tokenInfo.state
			}
		})

		if (!this.driver) {
			return Promise.reject({
				error: 'misconfigure profile'
			})
		}

		CorbelActions.storeCorbelDriver(this.driver.config.config)

		CorbelActions.storeNewLoginData({
			profile: 'From token',
			environment: environmentName,
			login: 'From token',
			url: corbelConfig.getEnvironmentUrl(environmentName)
		})

		CorbelActions.newLogin(token)

	}

	decodeToken(token) {
		var tokenInfo
		try {
			tokenInfo = JSON.parse(window.atob(token.split('.')[0]))
		} catch (error) {
			tokenInfo = {}
		}
		return tokenInfo
	}

}

export default new CorbelService();
