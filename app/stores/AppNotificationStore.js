import alt from "../alt.js"
import AppNotificationActions from "../actions/AppNotificationActions"

class AppNotificationStore {

	constructor() {
		this.bindActions(AppNotificationActions)
		this.notification = {text: undefined}
		this.logs = []
		this.newNotification = false
	}

	saveNewMessage(message) {
		message.date = Date.now()
		this.logs.push(message)
		this.notification = message
		this.newNotification = true
	}

	saveNewError(text) {
		this.saveNewMessage({text: text, type: 'error'})
	}

	saveNewInfo(text) {
		this.saveNewMessage({text: text, type: 'info'})
	}

	onNotifyError({error}) {
		this.saveNewError(error)
	}

	onNotifyInfo({info}) {
		this.saveNewInfo(info)
	}

	onCloseNotification() {
		this.newNotification = false
	}

}

export default alt.createStore(AppNotificationStore, 'AppNotificationStore');
