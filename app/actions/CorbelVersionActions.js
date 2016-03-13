import alt from '../alt';

class CorbelVersionActions {
  constructor() {
      this.generateActions(
          'refresh',
          'saveVersion'
      )
  }
}

export default alt.createActions(CorbelVersionActions);
