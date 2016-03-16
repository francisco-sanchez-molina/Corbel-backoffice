import React from "react";

import DataViewer from "../../viewer/DataViewer.jsx"

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.users=[];
    this.corbel = props.route.corbel;
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <DataViewer dataAccessObject={new this.corbel.UserDataAccessObject()}/>
      </div>
    )
  }

}

export default Users;
