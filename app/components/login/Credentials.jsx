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
    state.login = corbelConfig.getLogin();
    state.password = corbelConfig.getPassword();
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
    CorbelActions.storeCorbelConfig(
        { clientId: this.state.clientId,
          clientSecret: this.state.secret,
          urlBase: this.state.urlBase,
          login: this.state.login,
          password: this.state.password});
  }

  handleChange(event) {
    var stateUpdate = {};
    stateUpdate[event.target.getAttribute("id")] = event.target.value;
    this.setState(stateUpdate);
  }

  render() {
    return (
      <Pane>
        <h1>Corbel configuration</h1>
        <Input label="Url base" id="urlBase" placeholder="Url base" value={this.state.urlBase} onChange={(event) => this.handleChange(event)}/>
        <Input label="Client id" id="clientId" placeholder="Client id" value={this.state.clientId} onChange={(event) => this.handleChange(event)} />
        <Input label="Client secret" id="secret" placeholder="Client secret" value={this.state.secret} onChange={(event) => this.handleChange(event)}/>
        <Input label="Login" id="login" placeholder="login" value={this.state.login} onChange={(event) => this.handleChange(event)} />
        <div className="form-group">
              <label>Password</label>
              <input  ref="text"
                className="form-control"
                placeholder="password"
                type="password"
                value={this.state.password}
                onChange={(event) => this.handleChange(event)} />
        </div>
        <Button onClick={() => this.onSaveClientCredentialsClick()} class="btn btn-form btn-primary" text="Save"/>
      </Pane>
    )
  }

}

export default Credentials;
