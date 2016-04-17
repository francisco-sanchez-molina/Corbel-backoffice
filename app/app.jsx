import React from "react";
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';

import {Window, Content, PaneGroup, Pane} from "react-photonkit";
import {Router, Route, Link, hashHistory} from 'react-router'
import Header from "./components/header/Header.jsx"
import Footer from "./footer.jsx";
import AppNotification from "./components/appNotification/AppNotification.jsx"

import Home from "./components/home.jsx"
import Sidebar from "./components/sidebar.jsx"
import CorbelLogin from "./components/login/CorbelLogin.jsx"
import Configuration from "./components/configuration/Configuration.jsx"
import Shell from './components/shell/Shell.jsx'

import CorbelUsers from "./components/iam/user/Users.jsx"
import CorbelClients from "./components/iam/client/Clients.jsx"
import CorbelAssets from "./components/assets/Assets.jsx"

import CorbelResources from "./components/resources/Resources.jsx"
import BackendVersions from "./components/backendVersion/versions.jsx"
import CorbelTools from "./components/tools/tools.jsx"

import SidebarEntry from "./model/SidebarEntry.js"

import CorbelStore from "./stores/CorbelStore";
import CorbelActions from "./actions/CorbelActions";

import AppNotificationStore from "./stores/AppNotificationStore"
import AppNotificationActions from "./actions/AppNotificationActions"

import CorbelVersionStore from "./stores/CorbelVersionStore"
import CorbelVersionActions from "./actions/CorbelVersionActions"

import DataViewerStore from "./stores/DataViewerStore"

import CorbelService from "./service/CorbelService"
import UserDataAccessObject from "./service/UserDataAccessObject"
import ClientsDataAccessObject from "./service/ClientsDataAccessObject"
import AssetsDataAccessObject from "./service/AssetsDataAccessObject"
import ResourcesDataAccessObject from "./service/ResourcesDataAccessObject"

require('../index.scss')

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

var corbel = {
  corbelStore: CorbelStore,
  appNotificationStore: AppNotificationStore,
  corbelVersionStore: CorbelVersionStore,
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
  new SidebarEntry('Shell', '#/shell', 'window'),
  new SidebarEntry('Configuration', '#/configuration', 'cog'),
  new SidebarEntry('Versions', '#/versions', 'bookmark'),
  new SidebarEntry('Tools', '#/tools', 'cog')
]

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>

      <Window>
        <Header corbel={corbel}/>
          <Content>
            <PaneGroup>
              <Sidebar entries={sidebarEntries}/>
              {this.props.children}
            </PaneGroup>
          </Content>
          <AppNotification corbel={corbel}/>

        <Footer/>
      </Window>
    </MuiThemeProvider>

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
      component={Shell}
      path="/shell"
      corbel={corbel}/>

    <Route
      component={Configuration}
      path="/configuration"
      corbel={corbel}/>

    <Route
      component={BackendVersions}
      path="/versions"
      corbel={corbel}/>

    <Route
      component={CorbelTools}
      path="/tools"
      corbel={corbel}/>

  </Route>
)

hashHistory.push('/home')
ReactDOM.render(
  <Router history={hashHistory}>
    {routes}
  </Router>,
  document.getElementById("main")
)

function refreshVersion () {
  CorbelVersionActions.refresh()
  setTimeout(refreshVersion, 5000)
}

refreshVersion()
