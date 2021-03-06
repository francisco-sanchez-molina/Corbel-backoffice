import React from "react";

import DataViewer from "../viewer/DataViewer.jsx"
import ScrollPane from "../viewer/ScrollPane.jsx"

class Assets extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.users=[];
    this.corbel = props.route.corbel;
  }

  render() {
    return (
      <ScrollPane title='Assets'>
        <DataViewer dataAccessObject={new this.corbel.AssetsDataAccessObject()}/>
      </ScrollPane>
    )
  }

}

export default Assets;
