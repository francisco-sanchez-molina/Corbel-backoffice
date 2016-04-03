import React from "react";
import {Button, Input} from "react-photonkit";

class Connect extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.corbel;
    this.corbelSession =  this.corbel.corbelStore.getState().backofficeCorbel.getCorbelSession();
    this.corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig();
    this.waitingActions = this.corbel.waitingActions
    this.state = {};
    this.state.profiles = [];
    this.state.environments = [];
    this._onChange = this._onChange.bind(this);
  }

  loadState() {
    var state = this.getAppState();
    this.setState(state);
  }

  getAppState() {
    var state = {};
    state.profiles = this.corbelConfig.getProfileNames();
    state.environments = this.corbelConfig.getEnvironmentNames()
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
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig()
    var profileSelected = this.refs.profileSelect.value || state.profiles[0]
    var environmentSelected = this.refs.environmentSelect.value || state.environments[0]

    var promise = this.corbel.corbelService.login(profileSelected, environmentSelected)
    this.waitingActions.waitForPromise({module: 'corbelLogin', promise: promise})
  }

  onChangeProfile(event) {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig()
    var profileSelected = this.refs.profileSelect.value || state.profiles[0]
    this.setState({profile: profileSelected})
  }


  onChangeEnvironment(event) {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig()
    var environmentSelected = this.refs.environmentSelect.value || state.environments[0]
    this.setState({environment: environmentSelected})
  }

  render() {
    return (
      <div>
        <h3>Connect</h3>
        <div>
          <div style={{margin: '5px', heigth:'auto', verticalAlign: 'middle', width:'200px', float:'left'}}>
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
            <select
              onChange={(event) => this.onChangeEnvironment(event)}
              className="form-control"
              value={this.state.evironment}
              ref="environmentSelect">
              {
                this.state.environments.map(function(environmentName) {
                  return (
                    <option value={environmentName}>
                      {environmentName}
                    </option>
                  )
                })
              }
            </select>
          </div>
          <div style={{margin: '5px', heigth:'auto', verticalAlign: 'middle', float:'left'}}>
            <Button
              onClick={() => this.onConnectClick()}
              class="btn btn-form btn-primary"
              ptSize="large"
              ptStyle="primary"
              text="Connect" />
          </div>
          <div style={{display: 'block', clear: 'both'}} />
        </div>
      </div>
    )
  }

}

export default Connect;
