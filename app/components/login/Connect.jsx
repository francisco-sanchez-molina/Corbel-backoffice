import React from "react";
import {Button, Input} from "react-photonkit";

class Connect extends React.Component {

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

  onConnectClick() {
    this.corbel.corbelService.login();
  }

  render() {
    return (
      <div>
      <h1>Connect</h1>
      <div class="form-group">
        <label>Token:</label>
        <Input type="text" class="form-control" placeholder="token" value={this.state.token} />
      </div>
      <div class="form-group">
        <label>Refresh token:</label>
        <Input type="text" class="form-control" placeholder="token" value={this.state.refreshToken} />
      </div>
      <div class="form-group">
        <Button onClick={() => this.onConnectClick()} class="btn btn-form btn-primary" text="Connect" />
      </div>
      </div>
    )
  }

}

export default Connect;
