import alt from '../alt';

class CorbelActions {
  constructor() {
      this.generateActions(
          'storeCorbelConfig',
          'storeCorbelDriver',
          'newLogin'
      )
  }
}

export default alt.createActions(CorbelActions);
