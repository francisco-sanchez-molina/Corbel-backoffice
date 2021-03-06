import React from "react"
import {Window, Button, Input} from "react-photonkit"

class SetupProfiles extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.corbel
    this.FIRST_OPTION = 'firstOption'
    this.state = {
      profiles: [],
      profile: this.FIRST_OPTION
    }
    this.loadState = this.loadState.bind(this)
  }

  loadState() {
    this.loadProfiles()
  }

  loadProfiles() {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig()
    var state = {}
    state.profiles = corbelConfig.getProfileNames()
    this.setState(state)
  }

  componentDidMount() {
    this.corbel.corbelStore.listen(this.loadState);
    this.loadProfiles()
  }

  componentWillUnmount() {
    this.corbel.corbelStore.unlisten(this.loadState);
  }

  onSaveClientCredentialsClick () {
    var profileSelected = this.refs.profileName.refs.text.value
    if (profileSelected.length<1) {
      return
    }

    var data = {
      profileName : profileSelected,
      clientId : this.refs.clientId.refs.text.value,
      clientSecret : this.refs.secret.refs.text.value,
      login : this.refs.login.refs.text.value,
      password : this.refs.password.value,
      deviceId : this.refs.deviceId.refs.text.value,
    }

    this.corbel.corbelActions.storeCorbelConfigProfile(data)
    this.setState({profile: profileSelected})
  }

  onDeleteClientCredentialsClick () {
    var profileSelected = this.refs.profileSelect.value
    if (profileSelected==this.FIRST_OPTION) {
      return
    }
    this.cleanFields()
    this.corbel.corbelActions.deleteCorbelConfigProfile({name:profileSelected})
    this.setState({profile:this.FIRST_OPTION})
  }

  onChangeProfile(event) {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig()
    var profileSelected = this.refs.profileSelect.value

    this.setState({profile: profileSelected})

    if (profileSelected==this.FIRST_OPTION) {
      this.cleanFields()
      return
    }
    this.refs.profileName.refs.text.value = profileSelected
    this.refs.clientId.refs.text.value = corbelConfig.getClientId(profileSelected) || ''
    this.refs.secret.refs.text.value = corbelConfig.getClientSecret(profileSelected) || ''
    this.refs.login.refs.text.value = corbelConfig.getLogin(profileSelected) || ''
    this.refs.password.value = corbelConfig.getPassword(profileSelected) || ''
    this.refs.deviceId.refs.text.value = corbelConfig.getDeviceId(profileSelected) || ''


  }

  cleanFields(){
    this.refs.profileName.refs.text.value = ''
    this.refs.clientId.refs.text.value = ''
    this.refs.secret.refs.text.value = ''
    this.refs.login.refs.text.value = ''
    this.refs.password.value = ''
    this.refs.deviceId.text.value = ''
  }

  render() {
    return (
      <div>
        <h3>Profiles</h3>
        <div>
          <div style={{margin: '5px', heigth:'auto', verticalAlign: 'middle', width:'200px', float:'left'}}>
            <select
              onChange={(event) => this.onChangeProfile(event)}
              className="form-control"
              ref="profileSelect"
              value={this.state.profile}>
              <option value={this.FIRST_OPTION}>
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
          </div>
          <div style={{margin: '5px', heigth:'auto', verticalAlign: 'middle', float: 'left'}}>
            <Button
              onClick={() => this.onDeleteClientCredentialsClick()}
              class="btn btn-form btn-primary"
              ptStyle="negative"
              glyph="trash"
              text="Delete"/>
          </div>
          <div style={{display: 'block', clear: 'both'}} />
        </div>
        <Input
          label="Profile name"
          id="profileName"
          placeholder="Profile name"
          ref="profileName"/>
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
        <Input
          label="Device id"
          id="deviceId"
          placeholder="device id"
          ref="deviceId" />
        <div>
          <div>
            <Button
              onClick={() => this.onSaveClientCredentialsClick()}
              class="btn btn-form btn-primary"
              ptStyle="positive"
              glyph="floppy"
              text="Save"/>
          </div>

        </div>

      </div>
    )
  }

}

export default SetupProfiles;
