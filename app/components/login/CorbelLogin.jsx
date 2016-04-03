import React from 'react'
import {Window, Button, Pane, Input} from 'react-photonkit'

import Connect from './component/Connect.jsx'
import ConnectToken from './component/ConnectToken.jsx'
import Status from './component/Status.jsx'
import Waiting from '../waiting/waiting.jsx'
import Paper from 'material-ui/lib/paper'


class CorbelLogin extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.route.corbel;
  }

  render() {
    return (
      <Pane className="padded">
        <Waiting name="corbelLogin" />
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
            <Status  corbel={this.corbel} />
          </div>
        </Paper>
      </Pane>
    )
  }

}

export default CorbelLogin;
