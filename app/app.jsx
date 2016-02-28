import React from "react";
import ReactDom from 'react-dom'
import {Window, Content, PaneGroup, Pane} from "react-photonkit";
import {Router, Route, Link, hashHistory} from 'react-router'
import Header from "./header.jsx"
import Footer from "./footer.jsx";
import Home from "./components/home.jsx"
import Sidebar from "./components/sidebar.jsx"
import CorbelLogin from "./components/login/CorbelLogin.jsx"
import CorbelUsers from "./components/user/Users.jsx"
import AppActions from "./actions/AppActions";
import SidebarEntry from "./model/SidebarEntry.js"

import CorbelStore from "./stores/CorbelStore";
import CorbelActions from "./actions/CorbelActions";
import CorbelService from "./service/CorbelService"

require('../index.scss');

var corbel = {corbelStore : CorbelStore,
              corbelActions : CorbelActions,
              corbelService : CorbelService}

class App extends React.Component {
  render() {
    return (
      <Window>
        <Header/>
          <Content>
            <PaneGroup>
							<Sidebar/>
							<Pane className="padded-more">
								{this.props.children}
				      </Pane>
					</PaneGroup>
					</Content>
					<Footer/>
			</Window>
	  )
	}
}

AppActions.addSidebarEntry(new SidebarEntry('Home', '#/home', 'home'));
AppActions.addSidebarEntry(new SidebarEntry('Login', '#/CorbelLogin', 'cog'));
AppActions.addSidebarEntry(new SidebarEntry('Users', '#/users', 'user'));

var routes = (
  <Route component={App} path="/">
    <Route component={Home} path="/home" />
    <Route component={CorbelLogin} path="/CorbelLogin" corbel={corbel} />
    <Route component={CorbelUsers} path="/users" corbel={corbel} />
  </Route>
)

hashHistory.push('/home')
ReactDom.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById("main"))
