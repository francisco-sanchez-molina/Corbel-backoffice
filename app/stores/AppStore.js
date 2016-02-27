import alt from "../alt.js";
import AppActions from "../actions/AppActions";
import SidebarEntry from "../model/SidebarEntry.js"

class AppStore {

	constructor() {
		this.bindActions(AppActions);
		this.app = {
			sidebar: [],
		};
	}

	onAddSidebarEntry(sidebarEntry : SidebarEntry) {
		this.app.sidebar.push(sidebarEntry);
	}

}

export default alt.createStore(AppStore);
