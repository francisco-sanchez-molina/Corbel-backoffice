import React from "react";

import DataViewer from "../../viewer/DataViewer.jsx"

class Clients extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.users=[];
    this.corbel = props.route.corbel;
  }

  render() {
    return (
      <div>
        <h1>Clients</h1>
        <DataViewer dataAccessObject={new this.corbel.ClientsDataAccessObject()}/>
      </div>
    )
  }

}

export default Clients;
