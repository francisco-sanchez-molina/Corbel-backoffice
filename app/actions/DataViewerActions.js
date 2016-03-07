import alt from '../alt';

class DataViewerActions {
  constructor() {
      this.generateActions(
        'fetchNextPage',
        'setQuery',
        'setDataCollector'
      )
  }
}

export default alt.createActions(DataViewerActions);
