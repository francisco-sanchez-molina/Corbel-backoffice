import alt from "../alt.js"
import DataViewerActions from "../actions/DataViewerActions"

class DataViewerStore {

	constructor() {
		this.bindActions(DataViewerActions);
		this.state = {}
		this.state.disableScrollCheck = true
		this.state.lastPageLoaded=-1
	}

	onLoadData(state) {
		this.setState(state);
	}

	onFetchNextPage(state) {
		this.state.disableScrollCheck=true;
		var loadPage = this.state.lastPageLoaded + 1;
		this.state.lastPageLoaded = loadPage;

		var updateFunction = this.setDataForPage.bind(this, loadPage);
		var failFunction = this.setFailDataForPage.bind(this, loadPage);
		this.state.dataCollector.fetchPage(loadPage).then(updateFunction).catch(failFunction);
		this.state['Page_' + loadPage] = {data: [{status:'loading'}], page:loadPage};

	}

	setDataForPage(page, data) {
		var state =  {};
		state.disableScrollCheck = false;
    state['Page_' + page] = {data: data, page:page};
		this.setState(state);
  }

  setFailDataForPage(page, data) {
		var state = {};
		state.disableScrollCheck = false;
    state['Page_' + page] = {data: [{status:'fail', cause: data}], page:page};
		this.setState(state);
  }

	onSetQuery(state){
			var query = JSON.parse(state.query);
			this.apiQuery = query;
			this.state = {
				dataCollector: this.state.dataCollector,
				disableScrollCheck: true,
				lastPageLoaded:-1,
				currentQuery: query
			}
			this.state.dataCollector.setQuery(query);
			this.onFetchNextPage();
	}

	onSetDataCollector(state) {
		this.state = {};
		this.state.disableScrollCheck = true
		this.state.lastPageLoaded=-1
		this.state.dataCollector = state.dataCollector;
	}

}

export default alt.createStore(DataViewerStore, 'DataViewerStore');
