import alt from '../alt';

class DataViewerActions {
  constructor() {
      this.generateActions(
        'fetchNextPage',
        'setQuery',
        'setDataAccessObject'
      )
  }
}

export default alt.createActions(DataViewerActions);
