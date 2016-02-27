import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";
import corbel from "corbel-js";

import Credentials from "./Credentials.jsx";
import Connect from "./Connect.jsx";
import Status from "./Status.jsx";


class CorbelLogin extends React.Component {

  constructor(props) {
      super(props);
      this.state = {};
  }

  render() {
    return (
      <div>
        <Credentials />
        <Connect />
        <Status />
      </div>
    )
  }

}

export default CorbelLogin;
