import React from "react";

import Pager from "../../viewer/Pager.jsx"

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
        <Pager dataCollector={new this.corbel.UserDataCollector()}/>
      </div>
    )
  }

}

export default Users;
