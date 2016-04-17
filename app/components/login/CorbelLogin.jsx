import React from 'react'
import {Window, Button, Pane, Input} from 'react-photonkit'

import Connect from './component/Connect.jsx'
import ConnectToken from './component/ConnectToken.jsx'
import Status from './component/Status.jsx'
import Waiting from '../waiting/waiting.jsx'
import Paper from 'material-ui/Paper'


class CorbelLogin extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.route.corbel
    this.state = this.corbel.corbelStore.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    this.corbel.corbelStore.listen(this._onChange);
  }

  componentWillUnmount() {
    this.corbel.corbelStore.unlisten(this._onChange);
  }

  _onChange() {
    this.setState(this.corbel.corbelStore.getState())
  }

  cancelWaiting() {
    this.corbel.corbelActions.cancelLogin()
  }

  render() {
    return (
      <Pane className="padded">
        <Waiting name="corbelLogin" waiting={this.state.loginInProgress} onCancel={() => this.cancelWaiting()} />
        <Paper>
          <div style={{
              padding: '0px 5px 5px 5px'
            }}>
            <Connect corbel={this.corbel} />
          </div>
        </Paper>
        <Paper>
          <div style={{
              padding: '0px 5px 5px 5px'
            }}>
            <ConnectToken corbel={this.corbel} />
          </div>
        </Paper>
        <Paper>
          <div style={{
              padding: '0px 5px 5px 5px'
            }}>
            <Status corbel={this.corbel} />
          </div>
        </Paper>
      </Pane>
    )
  }

}

export default CorbelLogin;
