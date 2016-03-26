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
import CorbelAssets from "./components/assets/Assets.jsx"

import CorbelResources from "./components/resources/Resources.jsx"

import BackendVersions from "./components/backendVersion/versions.jsx"

import SidebarEntry from "./model/SidebarEntry.js"

import CorbelStore from "./stores/CorbelStore";
import CorbelActions from "./actions/CorbelActions";

import CorbelVersionStore from "./stores/CorbelVersionStore";
import CorbelVersionActions from "./actions/CorbelVersionActions";

import DataViewerStore from "./stores/DataViewerStore";
import WaitingStore from "./stores/WaitingStore";
import WaitingActions from "./actions/WaitingActions";


import CorbelService from "./service/CorbelService"
import UserDataAccessObject from "./service/UserDataAccessObject"
import ClientsDataAccessObject from "./service/ClientsDataAccessObject"
import AssetsDataAccessObject from "./service/AssetsDataAccessObject"
import ResourcesDataAccessObject from "./service/ResourcesDataAccessObject"

require('../index.scss');

var corbel = {
  corbelStore: CorbelStore,
  corbelVersionStore: CorbelVersionStore,
  waitingStore: WaitingStore,
  waitingActions:  WaitingActions,
  corbelActions: CorbelActions,
  corbelService: CorbelService,
  UserDataAccessObject: UserDataAccessObject,
  ClientsDataAccessObject: ClientsDataAccessObject,
  ResourcesDataAccessObject: ResourcesDataAccessObject,
  AssetsDataAccessObject: AssetsDataAccessObject
}

var sidebarEntries = [
  new SidebarEntry('Home', '#/home', 'home'),
  new SidebarEntry('Login', '#/CorbelLogin', 'rocket'),
  new SidebarEntry('Users', '#/users', 'user'),
  new SidebarEntry('Clients', '#/clients', 'monitor'),
  new SidebarEntry('Assets', '#/assets', 'bag'),
  new SidebarEntry('Resources', '#/resources', 'archive'),
  new SidebarEntry('Configuration', '#/configuration', 'cog'),
  new SidebarEntry('Versions', '#/versions', 'bookmark')
];

class App extends React.Component {
  render() {
    return (
      <Window>
        <Header corbel={corbel}/>
        <Content>
          <PaneGroup>
            <Sidebar entries={sidebarEntries}/>
            {this.props.children}
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
      component={CorbelAssets}
      path="/assets"
      corbel={corbel}/>

    <Route
      component={CorbelResources}
      path="/resources"
      corbel={corbel}/>

    <Route
      component={Configuration}
      path="/configuration"
      corbel={corbel}/>

    <Route
      component={BackendVersions}
      path="/versions"
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

function refreshVersion () {
  CorbelVersionActions.refresh()
  setTimeout(refreshVersion,5000)
}
refreshVersion()
