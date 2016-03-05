import alt from '../alt';

class CorbelActions {
  constructor() {
      this.generateActions(
          'storeCorbelConfig',
          'storeNewProfile',
          'storeCorbelDriver',
          'newLogin'
      )
  }
}

export default alt.createActions(CorbelActions);
