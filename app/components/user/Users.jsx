import React from "react";

import JsonViewer from "../viewer/JsonViewer.jsx"


class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.users=[];
    this.corbelService = props.route.corbel.corbelService;
  }

  loadUsers(result) {
    var users = {users: result};
    this.setState(users);
  }

  componentDidMount() {
    var props = {};
    this.corbelService.getUsers(props, (result) => {this.loadUsers(result);});
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        {
          this.state.users.map(function(user) {
            return (
              <JsonViewer data={user}/>
            )
          })
        }
      </div>
    )
  }

}

export default Users;
