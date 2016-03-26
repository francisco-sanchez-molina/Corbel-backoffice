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
      <Pane className="padded">
        <div>
          <NewProfile corbel={this.corbel} />
        </div>
        <hr />
        <div>
          <SetupProfiles corbel={this.corbel} />
        </div>
        <hr />
        <div>
          <ImportProfiles corbel={this.corbel} />
        </div>
      </Pane>
    )
  }

}

export default Configuration;
