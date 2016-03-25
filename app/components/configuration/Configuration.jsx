import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";

import NewProfile from "./component/NewProfile.jsx";
import SetupProfiles from "./component/SetupProfiles.jsx";
import ImportProfiles from "./component/ImportProfiles.jsx";


class Configuration extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.route.corbel;
  }

  render() {
    return (
      <div>
        <NewProfile corbel={this.corbel} />
        <SetupProfiles corbel={this.corbel} />
        <ImportProfiles corbel={this.corbel} />
      </div>
    )
  }

}

export default Configuration;
