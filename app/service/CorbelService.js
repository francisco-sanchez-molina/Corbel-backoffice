import corbel from "corbel-js";

import CorbelStore from "../stores/CorbelStore";
import CorbelActions from "../actions/CorbelActions";

class CorbelService {
	constructor() {}

	getDriver() {
		if (!this.driver) {
			var corbelSession = CorbelStore.getState().backofficeCorbel.getCorbelSession();
			var config = corbelSession.getCorbelDriverConfig();
			if (config && config.urlBase) {
				this.driver = corbel.getDriver(config);
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

	login(profileName, environmentName) {
		var params = {}
		var corbelConfig = CorbelStore.getState().backofficeCorbel.getCorbelConfig()

		CorbelActions.resetLastLoginData();

		this.driver = this.createDriver(profileName, environmentName)

		if (!this.driver) {
			return Promise.reject({
				error: 'misconfigure profile'
			})
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
			};
		}
		if (corbelConfig.getDevice(profileName) && corbelConfig.getDevice(profileName).length > 0) {
			params.claims['device_id'] = deviceId;
		}

		return this.driver.iam.token().create(params).then(function(result) {
			CorbelActions.newLogin({
				token: result.data.accessToken,
				refreshToken: result.data.refreshToken
			});
			return result
		}).catch(error => {
			throw error
		})
	}

	decodeToken(token) {
		var tokenInfo
		try{
			tokenInfo = JSON.parse(window.atob(token.split('.')[0]))
		} catch(error) {
			tokenInfo = {}
		}
		return tokenInfo
	}

}

export default new CorbelService();
