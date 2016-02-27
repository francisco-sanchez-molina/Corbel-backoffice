import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";

import CorbelStore from "../../stores/CorbelStore";
import CorbelActions from "../../actions/CorbelActions";

class Credentials extends React.Component {

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
    var corbelConfig = CorbelStore.getState().backofficeCorbel.getCorbelConfig();
    var corbelSession = CorbelStore.getState().backofficeCorbel.getCorbelSession();

    var state = {};
    state.urlBase =  corbelConfig.getUrlBase();
    state.clientId = corbelConfig.getClientId();
    state.secret = corbelConfig.getClientSecret();
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

  onSaveClientCredentialsClick () {
    CorbelActions.storeCorbelConfig({clientId: this.state.clientId, clientSecret: this.state.secret, urlBase: this.state.urlBase});
  }

  handleChange(event) {
    var stateUpdate = {};
    stateUpdate[event.target.getAttribute("id")] = event.target.value;
    this.setState(stateUpdate);
  }

  render() {
    return (
      <Pane>
        <h1>Corbel credentials</h1>
        <div class="form-group">
          <label>Client id</label>
          <Input id="clientId" type="text" class="form-control" placeholder="Client id" value={this.state.clientId} onChange={(event) => this.handleChange(event)} />
        </div>
        <div class="form-group">
          <label>Client secret</label>
          <Input id="secret" type="text" class="form-control" placeholder="Client secret" value={this.state.secret} onChange={(event) => this.handleChange(event)}/>
        </div>
        <div class="form-group">
          <label>Urlbase</label>
          <Input id="urlBase" type="text" class="form-control" placeholder="Client secret" value={this.state.urlBase} onChange={(event) => this.handleChange(event)}/>
        </div>
        <div class="form-group">
          <Button onClick={() => this.onSaveClientCredentialsClick()} class="btn btn-form btn-primary" text="Save"/>
        </div>
      </Pane>
    )
  }

}

export default Credentials;
