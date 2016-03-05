import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";

import ConfigurationComponent from "./component/Configuration.jsx";

class Configuration extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.route.corbel;
  }

  render() {
    return (
      <div>
        <ConfigurationComponent corbel={this.corbel} />
      </div>
    )
  }

}

export default Configuration;
