import React from "react";
import {Button, Input} from "react-photonkit";

class ConnectToken extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.corbel
    this.corbelSession =  this.corbel.corbelStore.getState().backofficeCorbel.getCorbelSession()
    this.corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig()
    this.waitingActions = this.corbel.waitingActions
    this.state = {
      environments : []
    }
    this._onChange = this._onChange.bind(this)
  }

  loadState() {
    this.setState({
      environments : this.corbelConfig.getEnvironmentNames()
    })
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
    var environmentSelected = this.refs.environmentSelect.value
    var token = this.refs.token.getValue()
    this.corbel.corbelService.loginToken(token, environmentSelected)
  }

  onChangeEnvironment(event) {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig()
    var environmentSelected = this.refs.environmentSelect.value || state.environments[0]
    this.setState({environment: environmentSelected})
  }

  render() {
    return (
      <div>
        <h3>
          Connect with token
        </h3>

        <div style={{margin: '5px', heigth:'auto', verticalAlign: 'middle', width:'200px'}}>
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
        <Input
          label="Token"
          id="token"
          placeholder="Token"
          ref="token"/>
        <Button
          onClick={() => this.onConnectClick()}
          class="btn btn-form btn-primary"
          ptSize="large"
          ptStyle="primary"
          text="Connect" />
      </div>
    )
  }

}

export default ConnectToken;
