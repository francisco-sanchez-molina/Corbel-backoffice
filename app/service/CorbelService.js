import corbel from "corbel-js";

import BackofficeCorbel from "../model/BackofficeCorbel";
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

	createDriver(profileName) {
		var corbelConfig = CorbelStore.getState().backofficeCorbel.getCorbelConfig()
		if (!profileName ||
			!corbelConfig.getUrlBase(profileName) ||
			!corbelConfig.getClientId(profileName) ||
			!corbelConfig.getClientSecret(profileName)) {
			return undefined
		}

		return corbel.getDriver({
			urlBase: corbelConfig.getUrlBase(profileName),
			clientId: corbelConfig.getClientId(profileName),
			clientSecret: corbelConfig.getClientSecret(profileName),
			scopes: ''
		})
	}

	login(profileName) {
		var params = {}
		var corbelConfig = CorbelStore.getState().backofficeCorbel.getCorbelConfig()


		CorbelActions.resetLastLoginData();

		this.driver = this.createDriver(profileName)

		if (!this.driver) {
			return Promise.reject({
				error: 'misconfigure profile'
			})
		}

		CorbelActions.storeCorbelDriver(this.driver.config.config)

		CorbelActions.storeNewLoginData({
			profile: profileName,
			login: corbelConfig.getLogin(profileName),
			url: corbelConfig.getUrlBase(profileName)
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

}

export default new CorbelService();
