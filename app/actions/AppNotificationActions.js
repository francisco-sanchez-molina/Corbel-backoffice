import alt from '../alt';

class AppNotificationActions {

	constructor() {
		this.generateActions(
			'closeNotification'
		)
	}

	notifyError(error) {
		return {error}
	}

  notifyInfo(info) {
		return {info}
	}

}

export default alt.createActions(AppNotificationActions)
