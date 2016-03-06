import React from "react";
import {Button, Input} from "react-photonkit";

class Connect extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.corbel;
    this.corbelSession =  this.corbel.corbelStore.getState().backofficeCorbel.getCorbelSession();
    this.corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig();
    this.state = {};
    this.state.profiles = [];
    this._onChange = this._onChange.bind(this);
  }

  loadState() {
    var state = this.getAppState();
    this.setState(state);
  }

  getAppState() {
    var state = {};
    state.token = this.corbelSession.getToken();
    state.refreshToken = this.corbelSession.getRefreshToken();
    state.sessionProfile = this.corbelSession.getProfile();
    state.profiles = this.corbelConfig.getProfileNames();
    state.profile = this.corbelConfig.getDefaultProfile();

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

  onChangeProfile(event) {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig();
    var profileSelected = this.refs.profileSelect.value || state.profiles[0];
    this.corbel.corbelActions.setProfile({name: profileSelected});
  }

  render() {
    return (
      <div>
        <h1>Connect</h1>
        <select
          onChange={(event) => this.onChangeProfile(event)}
          className="form-control"
          value={this.state.profile}
          ref="profileSelect">
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
        <Button
          onClick={() => this.onConnectClick()}
          class="btn btn-form btn-primary"
          text="Connect" />
      </div>
    )
  }

}

export default Connect;
