import alt from "../alt.js"
import DataViewerActions from "../actions/DataViewerActions"

class DataViewerStore {

	constructor() {
		this.bindActions(DataViewerActions);
		this.state = {}
		this.state.disableScrollCheck = true
		this.state.lastPageLoaded = -1
		this.state.lastPage = false
		this.state.pages = {}
		this.state.elements = 0
	}

	onGetTotalElements(state) {
		this.state.dataAccessObject.getTotalElements()
			.then((result) => this.setState({
				elements: result.count
			}))
			.catch((error) => console.log(error))
	}

	onFetchNextPage(state) {
		this.state.disableScrollCheck = true;
		var loadPage = this.state.lastPageLoaded + 1;
		if (loadPage * this.state.dataAccessObject.getPageSize() > this.state.elements) {
			return
		}

		this.state.lastPageLoaded = loadPage;

		var updateFunction = this.setDataForPage.bind(this, loadPage);
		var failFunction = this.setFailDataForPage.bind(this, loadPage);
		this.state.dataAccessObject.fetchPage(loadPage).then(updateFunction).catch(failFunction);
		this.state.pages[loadPage] = [{
			data: {
				status: 'loading'
			}
		}];
	}

	setDataForPage(page, data) {
		this.state.disableScrollCheck = false;
		this.state.pages[page] = data.map(function(entry) {
			return {
				data: entry
			}
		});
		this.setState(this.state)
	}

	setFailDataForPage(page, data) {
		this.state.disableScrollCheck = false;
		this.state.pages[page] = [{
			data: {
				status: 'fail',
				cause: data
			}
		}]
		this.setState(this.state)
	}

	onSetQuery(state) {
		var query = JSON.parse(state.query);
		this.apiQuery = query;
		this.state = {
			dataAccessObject: this.state.dataAccessObject,
			disableScrollCheck: true,
			lastPageLoaded: -1,
			currentQuery: query,
			pages : {}
		}
		this.state.dataAccessObject.setQuery(query)
		this.setState(this.state)
		this.onFetchNextPage()
		this.onGetTotalElements()
	}

	onSetDataAccessObject(state) {
		this.state.disableScrollCheck = true
		this.state.lastPageLoaded = -1
		this.state.dataAccessObject = state.dataAccessObject
		this.state.pages = {}
	}

	updateObjectState(newData, page, index) {
		this.state.pages[page][index].data = newData
		this.state.pages[page][index].status = 'saved'
		this.setState(this.state)
	}

	onUpdateObject(data) {
		var oldData = data.old
		var newData = data.new
		var page = data.page
		var index = data.index
		this.state.pages[page][index].status = 'saving'
		this.setState(this.state)
			//this.updateObjectState(newData, page, index)
		this.state.dataAccessObject.updateResource(oldData, newData)
			.then(() => {
				this.state.dataAccessObject.getResource(oldData.id)
					.then((storedData) => this.updateObjectState(storedData, page, index))
			})
			.catch((error) => console.log(error))
	}

}

export default alt.createStore(DataViewerStore, 'DataViewerStore');
