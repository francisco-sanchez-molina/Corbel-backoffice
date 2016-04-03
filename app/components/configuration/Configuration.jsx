import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";
import Paper from 'material-ui/lib/paper'

import SetupProfiles from "./component/SetupProfiles.jsx";
import SetupEnvironment from "./component/SetupEnvironment.jsx";
import ImportProfiles from "./component/ImportProfiles.jsx";


class Configuration extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.route.corbel;
  }

  render() {
    return (
      <Pane className="padded">
        <Paper>
          <div style={{
              padding: '0px 5px 5px 5px'
            }}>
            <SetupProfiles corbel={this.corbel} />
          </div>
        </Paper>
        <Paper>
          <div style={{
              padding: '0px 5px 5px 5px'
            }}>
            <SetupEnvironment corbel={this.corbel} />
          </div>
        </Paper>
        <Paper>
          <div style={{
              padding: '0px 5px 5px 5px'
            }}>
            <ImportProfiles corbel={this.corbel} />
          </div>
        </Paper>
      </Pane>
    )
  }

}

export default Configuration;
