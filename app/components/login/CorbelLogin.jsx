import React from 'react'
import {Window, Button, Pane, Input} from 'react-photonkit'

import Connect from './component/Connect.jsx'
import ConnectToken from './component/ConnectToken.jsx'
import Status from './component/Status.jsx'
import Waiting from '../waiting/waiting.jsx'

class CorbelLogin extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.route.corbel;
  }

  render() {
    return (
      <Pane className="padded">
        <Waiting name="corbelLogin" />
        <Connect corbel={this.corbel} />
        <ConnectToken corbel={this.corbel} />
        <Status  corbel={this.corbel} />
      </Pane>
    )
  }

}

export default CorbelLogin;
