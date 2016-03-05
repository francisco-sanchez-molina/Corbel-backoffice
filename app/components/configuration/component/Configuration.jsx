import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";

class Configuration extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.corbel;
    this.state = {};
    this.state.profiles = [];
    this._onChange = this._onChange.bind(this);
  }

  loadState() {
    var state = this.getAppState();
    this.setState(state);
  }

  getAppState() {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig();
    var corbelSession = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelSession();

    var state = {};
    state.profiles = corbelConfig.getProfileNames();
    state.profileSelected = this.state.profileSelected || state.profiles[0];

    state.urlBase =  corbelConfig.getUrlBase(state.profileSelected);
    state.clientId = corbelConfig.getClientId(state.profileSelected);
    state.secret = corbelConfig.getClientSecret(state.profileSelected);
    state.token = corbelSession.getToken(state.profileSelected);
    state.login = corbelConfig.getLogin(state.profileSelected);
    state.password = corbelConfig.getPassword(state.profileSelected);
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

  onSaveNewProfile () {
    this.corbel.corbelActions.storeNewProfile(
      { profileName: this.state.profileName});
  }


      onSaveClientCredentialsClick () {
        this.corbel.corbelActions.storeCorbelConfig(
          { profileName: this.state.profileSelected,
            clientId: this.state.clientId,
            clientSecret: this.state.secret,
            urlBase: this.state.urlBase,
            login: this.state.login,
            password: this.state.password});
      }

      onChangeProfile(event) {
        var state = {};
        state.profileSelected = event.target.value;
        this.setState(state);
      }

      handleChange(event) {
        var stateUpdate = {};
        stateUpdate[event.target.getAttribute("id")] = event.target.value;
        this.setState(stateUpdate);
      }

      render() {
        return (
          <Pane>
            <h1>
              Corbel configuration
            </h1>
            <Input
              label="Add new profile"
              id="profileName"
              placeholder="Profile name"
              value={this.state.profileName}
              onChange={(event) => this.handleChange(event)}/>
            <Button
              onClick={() => this.onSaveNewProfile()}
              class="btn btn-form btn-primary"
              text="Save"/>
            <h1>
              Profiles
            </h1>

            {this.state.profileSelected}
            <select onChange={(event) => this.onChangeProfile(event)} className="form-control" ref="profileSelect">
              {
                this.state.profiles.map(function(profileName) {
                  return (
                    <option>{profileName}</option>
                        )
                        })
              }
            </select>

            <Input
              label="Url base"
              id="urlBase"
              placeholder="Url base"
              value={this.state.urlBase}
              onChange={(event) => this.handleChange(event)}/>
            <Input
              label="Client id"
              id="clientId"
              placeholder="Client id"
              value={this.state.clientId}
              onChange={(event) => this.handleChange(event)} />
            <Input
              label="Client secret"
              id="secret"
              placeholder="Client secret"
              value={this.state.secret}
              onChange={(event) => this.handleChange(event)}/>
            <Input
              label="Login"
              id="login"
              placeholder="login"
              value={this.state.login}
              onChange={(event) => this.handleChange(event)} />
            <div className="form-group">
              <label>Password</label>
              <input
                id="password"
                ref="text"
                className="form-control"
                placeholder="password"
                type="password"
                value={this.state.password}
                onChange={(event) => this.handleChange(event)} />
            </div>
            <Button
              onClick={() => this.onSaveClientCredentialsClick()}
              class="btn btn-form btn-primary"
              text="Save"/>
          </Pane>
        )
      }

    }

    export default Configuration;
