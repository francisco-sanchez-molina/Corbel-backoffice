import alt from '../alt';

class CorbelActions {
  constructor() {
      this.generateActions(
          'storeCorbelConfig',
          'deleteCorbelConfigProfile',
          'storeNewProfile',
          'storeCorbelDriver',
          'newLogin'
      )
  }
}

export default alt.createActions(CorbelActions);
