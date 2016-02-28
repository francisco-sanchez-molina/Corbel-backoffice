import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";


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

  editUser(user) {
    console.log(user);
  }

  render() {
    var divPad = {
      padding: '10px 10px 10px 10px'
    };
    var that = this;
    var divStyle = {
      display: 'block',
      backgroundColor: 'WhiteSmoke'
    };
    return (
      <div>
        <h1>Users</h1>
          {
                this.state.users.map(function(user) {
                    return (
                      <div style={divPad}>
                        <div style={divStyle} onClick={() => that.editUser(user)}>
                          <div><pre>{JSON.stringify(user, null, 2)}</pre></div>
                        </div>
                      </div>
                    )
                })
            }
      </div>
    )
  }

}

export default Users;
