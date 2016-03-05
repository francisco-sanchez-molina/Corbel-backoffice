import React from "react";
import {Window, Button, Input} from "react-photonkit";

class SetupProfiles extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.corbel;
    this.state = {};
    this.state.profiles = [];
    this.loadState = this.loadState.bind(this);
  }

  loadState() {
    this.onChangeProfile();
  }

  loadProfiles() {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig();
    var state = {};
    state.profiles = corbelConfig.getProfileNames();
    this.setState(state);
  }

  componentDidMount() {
    this.corbel.corbelStore.listen(this.loadState);
    this.loadProfiles();
  }

  componentWillUnmount() {
    this.corbel.corbelStore.unlisten(this.loadState);
  }

  onSaveClientCredentialsClick () {
    var profileSelected = this.refs.profileSelect.value;
    if (profileSelected=='undefined') {
      return;
    }

    var data = {};
    data.profileName = profileSelected;
    data.urlBase = this.refs.urlBase.refs.text.value;
    data.clientId = this.refs.clientId.refs.text.value;
    data.clientSecret = this.refs.secret.refs.text.value;
    data.login = this.refs.login.refs.text.value;
    data.password = this.refs.password.value;
    this.corbel.corbelActions.storeCorbelConfig(data);
  }

  onChangeProfile(event) {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig();
    var profileSelected = this.refs.profileSelect.value || state.profiles[0];
    this.refs.urlBase.refs.text.value =  corbelConfig.getUrlBase(profileSelected);
    this.refs.clientId.refs.text.value = corbelConfig.getClientId(profileSelected);
    this.refs.secret.refs.text.value = corbelConfig.getClientSecret(profileSelected);
    this.refs.login.refs.text.value = corbelConfig.getLogin(profileSelected);
    this.refs.password.value = corbelConfig.getPassword(profileSelected);
  }

  render() {
    return (
      <div>

        <h1>
          Profiles
        </h1>

        {this.state.profileSelected}
        <select
          onChange={(event) => this.onChangeProfile(event)}
          className="form-control"
          ref="profileSelect">
          <option value='undefined'>
            Select one profile:
          </option>
          {
            this.state.profiles.map(function(profileName) {
              return (

                <option value={profileName}>
                  {profileName}
                </option>
              )
            })
          }
        </select>

        <Input
          label="Url base"
          id="urlBase"
          placeholder="Url base"
          ref="urlBase"/>
        <Input
          label="Client id"
          id="clientId"
          placeholder="Client id"
          ref="clientId" />
        <Input
          label="Client secret"
          id="secret"
          placeholder="Client secret"
          ref="secret"/>
        <Input
          label="Login"
          id="login"
          placeholder="login"
          ref="login" />
        <div className="form-group">
          <label>Password</label>
          <input
            id="password"
            ref="text"
            className="form-control"
            placeholder="password"
            type="password"
            ref="password" />
        </div>
        <Button
          onClick={() => this.onSaveClientCredentialsClick()}
          class="btn btn-form btn-primary"
          text="Save"/>
      </div>
    )
  }

}

export default SetupProfiles;
