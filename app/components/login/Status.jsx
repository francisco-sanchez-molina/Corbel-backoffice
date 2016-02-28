import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";

import CorbelStore from "../../stores/CorbelStore";

class Status extends React.Component {

  constructor(props) {
      super(props);
      this.state = {};
      this._onChange = this._onChange.bind(this);
  }

  loadState() {
    var state = this.getAppState();
    this.setState(state);
  }

  getAppState() {
    var corbelSession = CorbelStore.getState().backofficeCorbel.getCorbelSession();
    var state = {};
    state.token = corbelSession.getToken();
    if (state.token) {
      state.connected = 'connected';
      try{
        state.tokenInfo = JSON.parse(window.atob(state.token.split('.')[0]));
      } catch (error){
        state.tokenInfo = {};
      }
    } else {
      state.connected = 'disconnected';
      state.tokenInfo = {};
    }

    state.type = state.tokenInfo.type || '';
    state.clientId = state.tokenInfo.clientId || '';
    state.state = state.tokenInfo.state ? new Date(parseInt(state.tokenInfo.state)).toString() : '';
    state.domainId = state.tokenInfo.domainId || '';
    state.userId = state.tokenInfo.userId || '';
    state.groups = state.tokenInfo.groups || '';
    return state;
  }

  componentDidMount() {
    CorbelStore.listen(this._onChange);
    this.loadState();
  }

  componentWillUnmount() {
    CorbelStore.unlisten(this._onChange);
  }

  _onChange() {
    this.loadState();
  }

  render() {
    return (
      <div>
        <h1>Status</h1>
        <div class="form-group">
          <p>Type {this.state.type}</p>
          <p>ClientId {this.state.clientId}</p>
          <p>UserId {this.state.userId}</p>
          <p>Groups {this.state.groups}</p>
          <p>State {this.state.state}</p>
          <p>Domain {this.state.domainId}</p>
        </div>
      </div>
    )
  }

}

export default Status;
