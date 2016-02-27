import React from "react";
import {Button, Input} from "react-photonkit";

import CorbelStore from "../../stores/CorbelStore";
import CorbelService from "../../service/CorbelService"


class Connect extends React.Component {

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

  onConnectClick() {
    CorbelService.login();
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
        <Button onClick={() => this.onConnectClick()} class="btn btn-form btn-primary" text="Connect" />
      </div>
      </div>
    )
  }

}

export default Connect;
