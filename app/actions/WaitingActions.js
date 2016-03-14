import alt from '../alt';

class WaitingActions {
  constructor() {
      this.generateActions(
        'waitForPromise',
        'resolve',
        'fail',
        'abortPromise'
      )
  }
}

export default alt.createActions(WaitingActions);
