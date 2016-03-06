import alt from '../alt';

class CorbelActions {
  constructor() {
      this.generateActions(
          'storeCorbelConfig',
          'deleteCorbelConfigProfile',
          'storeNewProfile',
          'storeCorbelDriver',
          'newLogin',
          'setProfile'
      )
  }
}

export default alt.createActions(CorbelActions);
