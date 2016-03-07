import alt from '../alt';

class CorbelActions {
  constructor() {
      this.generateActions(
          'storeCorbelConfigProfile',
          'deleteCorbelConfigProfile',
          'storeNewProfile',
          'storeCorbelDriver',
          'newLogin',
          'setProfile'
      )
  }
}

export default alt.createActions(CorbelActions);
