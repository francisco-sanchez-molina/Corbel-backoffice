import React from "react";

import {Pane} from "react-photonkit";

import Token from './tool/token.jsx'

class Tools extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.route.corbel;
  }

  render() {
    return (
      <Pane className="padded">
        <h1>Tools</h1>
        <Token corbel={this.corbel}/>
      </Pane>
    )
  }

}

export default Tools;
