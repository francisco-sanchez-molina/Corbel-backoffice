import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";

class Status extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.corbel;
    this.state = {};
    this._onChange = this._onChange.bind(this);
  }

  loadState() {
    var state = this.getAppState();
    this.setState(state);
  }

  getAppState() {
    var corbelSession = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelSession();
    var state = {};
    state.token = corbelSession.getToken();
    state.refreshToken = corbelSession.getRefreshToken();
    state.sessionProfile = corbelSession.getProfile();
    state.sessionEnvironment = corbelSession.getEnvironment();

    state.tokenInfo = corbelSession.getTokenInfo();
    state.connected = state.token ? 'connected' : 'disconnected'
    state.type = state.tokenInfo.type || '';
    state.clientId = state.tokenInfo.clientId || '';
    state.state = state.tokenInfo.state ? new Date(parseInt(state.tokenInfo.state)).toString() : '';
    state.domainId = state.tokenInfo.domainId || '';
    state.userId = state.tokenInfo.userId || '';
    state.groups = state.tokenInfo.groups || '';
    return state;
  }

  componentDidMount() {
    this.corbel.corbelStore.listen(this._onChange);
    this.loadState();
  }

  componentWillUnmount() {
    this.corbel.corbelStore.unlisten(this._onChange);
  }

  _onChange() {
    this.loadState();
  }

  render() {
    return (
      <div>
        <h1>Status</h1>
        <div class="form-group">
          <Input
            type="text"
            label="Token:"
            placeholder="token"
            value={this.state.token} />
          <Input
            type="text"
            label="Refresh token:"
            placeholder="token"
            value={this.state.refreshToken} />
          <Input
            type="text"
            label="Profile:"
            placeholder="profile"
            value={this.state.sessionProfile} />
          <Input
            type="text"
            label="Environment:"
            placeholder="profile"
            value={this.state.sessionEnvironment} />
          <p>
            Type {this.state.type}
          </p>
          <p>
            ClientId {this.state.clientId}
          </p>
          <p>
            UserId {this.state.userId}
          </p>
          <p>
            Groups {this.state.groups}
          </p>
          <p>
            State {this.state.state}
          </p>
          <p>
            Domain {this.state.domainId}
          </p>
        </div>
      </div>
    )
  }

}

export default Status;
