import alt from '../alt';

import CorbelService from "../service/CorbelService"

class CorbelActions {
	constructor() {
		this.generateActions(
			'storeCorbelConfigProfile',
			'deleteCorbelConfigProfile',
			'storeCorbelConfigEnvironment',
			'deleteCorbelConfigEnvironment',
			'storeNewProfile',
			'storeCorbelDriver',
			'storeNewLoginData',
			'resetLastLoginData',
			'setProfile',
			'importConfiguration'
		)
	}

  cancelLogin() {
      CorbelService.cancelLogin()
      return {}
  }

	requestLogin(profile, environment) {
		return (dispatch) => {
			dispatch()
			CorbelService.login(profile, environment)
		}
	}

	newLogin(token, refresh) {
		return {token, refresh}
	}

	errorOnLogin(error) {
		return {error}
	}
}

export default alt.createActions(CorbelActions);
