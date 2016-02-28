import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";

import Configuration from "./Configuration.jsx";
import Connect from "./Connect.jsx";
import Status from "./Status.jsx";


class CorbelLogin extends React.Component {

  constructor(props) {
      super(props);
      this.corbel = props.route.corbel;
      console.log(this.corbel);
  }

  render() {
    return (
      <div>
        <Configuration corbel={this.corbel} />
        <Connect       corbel={this.corbel} />
        <Status        corbel={this.corbel} />
      </div>
    )
  }

}

export default CorbelLogin;
