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
        <Button
          onClick={() => this.onConnectClick()}
          class="btn btn-form btn-primary"
          text="Connect" />
      </div>
    )
  }

}

export default Connect;
