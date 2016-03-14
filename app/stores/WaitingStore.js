import alt from "../alt.js"
import WaitingActions from "../actions/WaitingActions"

class WaitingStore {

	constructor() {
		this.bindActions(WaitingActions);
		this.state = {}
	}

	onWaitForPromise(data) {
		var dateNow = Date.now()
		var state = {}
		state[data.module] = {}
		state[data.module].date = dateNow
		state[data.module].promise = data.promise
		state[data.module].wait = true
		this.setState(state);
		data.promise.then(result => {
			if (dateNow == this.state[data.module].date) {
				WaitingActions.resolve({
					module: data.module
				})
				return result
			}
		}).catch(error => {
				if (dateNow == this.state[data.module].date) {
					WaitingActions.fail({
						module: data.module,
						error: error
					})
					return error
				}
		})
	}

	onResolve(data) {
		var state = {}
		state[data.module] = {}
		this.setState(state);
	}

	onFail(data) {
		var state = {}
		state[data.module] = {
			error: data.error
		}
		this.setState(state);
	}

	onAbortPromise(module) {
		var state = this.state[module]
		if (state.promise) {
			var state = {}
			state[module] = {
				error: 'rejected promise'
			}
			this.setState(state);
		}

	}
}

export default alt.createStore(WaitingStore, 'WaitingStore');
