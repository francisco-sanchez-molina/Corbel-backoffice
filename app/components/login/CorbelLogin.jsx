import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";

import Connect from "./component/Connect.jsx";
import Status from "./component/Status.jsx";

class CorbelLogin extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.route.corbel;
  }

  render() {
    return (
      <div>
        <Connect       corbel={this.corbel} />
        <Status        corbel={this.corbel} />
      </div>
    )
  }

}

export default CorbelLogin;
