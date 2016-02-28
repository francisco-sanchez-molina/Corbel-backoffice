import React from "react";
import ReactDom from 'react-dom'
import {Window, Content, PaneGroup, Pane} from "react-photonkit";
import {Router, Route, Link, hashHistory} from 'react-router'
import Header from "./header.jsx"
import Footer from "./footer.jsx";
import Home from "./components/home.jsx"
import Sidebar from "./components/sidebar.jsx"
import CorbelLogin from "./components/login/CorbelLogin.jsx"
import AppActions from "./actions/AppActions";
import SidebarEntry from "./model/SidebarEntry.js"

require('../index.scss');

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

AppActions.addSidebarEntry(new SidebarEntry('Home', '#/home'));
AppActions.addSidebarEntry(new SidebarEntry('Login', '#/CorbelLogin'));

var routes = (
  <Route component={App} path="/">
    <Route component={Home} path="/home"></Route>
    <Route component={CorbelLogin} path="/CorbelLogin"></Route>
  </Route>
)

hashHistory.push('/home')
ReactDom.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById("main"))
