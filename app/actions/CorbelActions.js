import alt from '../alt';

class CorbelActions {
  constructor() {
      this.generateActions(
          'storeCorbelConfigProfile',
          'deleteCorbelConfigProfile',
          'storeNewProfile',
          'storeCorbelDriver',
          'newLogin',
          'storeNewLoginData',
          'resetLastLoginData',
          'setProfile',
          'importConfiguration'
      )
  }
}

export default alt.createActions(CorbelActions);
