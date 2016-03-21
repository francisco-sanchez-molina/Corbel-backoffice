import alt from '../alt';

class DataViewerActions {
  constructor() {
      this.generateActions(
        'getTotalElements',
        'fetchNextPage',
        'setQuery',
        'setDataAccessObject',
        'updateObject'
      )
  }
}

export default alt.createActions(DataViewerActions);
