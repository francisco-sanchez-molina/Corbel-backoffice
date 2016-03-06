import React from "react";
import ReactDom from 'react-dom'
import {Window, Content, PaneGroup, Pane} from "react-photonkit";
import {Router, Route, Link, hashHistory} from 'react-router'
import Header from "./components/header/Header.jsx"
import Footer from "./footer.jsx";
import Home from "./components/home.jsx"
import Sidebar from "./components/sidebar.jsx"
import CorbelLogin from "./components/login/CorbelLogin.jsx"
import Configuration from "./components/configuration/Configuration.jsx"

import CorbelUsers from "./components/iam/user/Users.jsx"
import CorbelClients from "./components/iam/client/Clients.jsx"
import CorbelResources from "./components/resources/Resources.jsx"

import SidebarEntry from "./model/SidebarEntry.js"

import CorbelStore from "./stores/CorbelStore";
import CorbelActions from "./actions/CorbelActions";
import CorbelService from "./service/CorbelService"
import UserDataCollector from "./service/UserDataCollector"
import ClientsDataCollector from "./service/ClientsDataCollector"
import ResourcesDataCollector from "./service/ResourcesDataCollector"

require('../index.scss');

var corbel = {
  corbelStore: CorbelStore,
  corbelActions: CorbelActions,
  corbelService: CorbelService,
  UserDataCollector: UserDataCollector,
  ClientsDataCollector: ClientsDataCollector,
  ResourcesDataCollector: ResourcesDataCollector
}

var sidebarEntries = [
  new SidebarEntry('Home', '#/home', 'home'),
  new SidebarEntry('Login', '#/CorbelLogin', 'cog'),
  new SidebarEntry('Users', '#/users', 'user'),
  new SidebarEntry('Clients', '#/clients', 'user'),
  new SidebarEntry('Resources', '#/resources', 'document'),
  new SidebarEntry('Configuration', '#/configuration', 'cog')
];

class App extends React.Component {
  render() {
    return (
      <Window>

        <Header corbel={corbel}/>

        <Content>

          <PaneGroup>

            <Sidebar entries={sidebarEntries}/>

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

var routes = (
  <Route component={App} path="/">

    <Route component={Home} path="/home"/>

    <Route
      component={CorbelLogin}
      path="/CorbelLogin"
      corbel={corbel}/>

    <Route
      component={CorbelUsers}
      path="/users"
      corbel={corbel}/>

    <Route
      component={CorbelClients}
      path="/clients"
      corbel={corbel}/>

    <Route
      component={CorbelResources}
      path="/resources"
      corbel={corbel}/>

    <Route
      component={Configuration}
      path="/configuration"
      corbel={corbel}/>

  </Route>
)

hashHistory.push('/home')
ReactDom.render(
  <Router history={hashHistory}>
    {routes}
  </Router>,
  document.getElementById("main")
)
