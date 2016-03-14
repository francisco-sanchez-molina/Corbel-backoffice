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
			if (config.urlBase) {
				this.driver = corbel.getDriver(config);
			} else {
				this.login();
			}
		}
		return this.driver;
	}

	login(profileName) {
		CorbelActions.resetLastLoginData();

		var params = {}
		var corbelConfig = CorbelStore.getState().backofficeCorbel.getCorbelConfig();
		var driver = corbel.getDriver({
			urlBase: corbelConfig.getUrlBase(profileName),
			clientId: corbelConfig.getClientId(profileName),
			clientSecret: corbelConfig.getClientSecret(profileName),
			scopes: ''
		});
		this.driver = driver;

		CorbelActions.storeCorbelDriver(driver.config.config);
		CorbelActions.storeNewLoginData({
			profile: profileName,
			login: corbelConfig.getLogin(profileName),
			url: corbelConfig.getUrlBase(profileName)
		});

		if (corbelConfig.getLogin(profileName) && corbelConfig.getLogin(profileName).length > 0) {
			params.claims = {
				'basic_auth.username': corbelConfig.getLogin(profileName),
				'basic_auth.password': corbelConfig.getPassword(profileName)
			};
		}
		if (corbelConfig.getDevice(profileName) && corbelConfig.getDevice(profileName).length > 0) {
			params.claims['device_id'] = deviceId;
		}

		return driver.iam.token().create(params).then(function(result) {
			CorbelActions.newLogin({
				token: result.data.accessToken,
				refreshToken: result.data.refreshToken
			});
			return result
		}).catch(error => {
			throw error
		})
	}

	getUsers(props) {
		return this.getDriver().iam.users()
			.get(props)
			.then(function(result) {
				return result.data;
			});
	}

	getClients(props) {
		var domain = this.getDriver().config.config.domain;
		return this.getDriver().iam.client(domain)
			.getAll(props)
			.then(function(result) {
				return result.data;
			});
	}

	getCollection(collection, props) {
		return this.getDriver().resources.collection(collection)
			.get(props)
			.then(function(result) {
				return result.data;
			});
	}
}

export default new CorbelService();
