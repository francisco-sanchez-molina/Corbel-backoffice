import React from "react";

import DataViewer from "../../viewer/DataViewer.jsx"
import ScrollPane from "../../viewer/ScrollPane.jsx"

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.users=[];
    this.corbel = props.route.corbel;
  }

  render() {
    return (
      <ScrollPane title='Users'>
        <DataViewer ref='dataViewer' dataAccessObject={new this.corbel.UserDataAccessObject()}/>
      </ScrollPane>
    )
  }

}

export default Users;
