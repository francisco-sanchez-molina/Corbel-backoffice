import React from "react"
import { Pane, NavGroup, NavTitle, NavGroupItem } from "react-photonkit"

import AppStore from "../stores/AppStore";

class Sidebar extends React.Component {
  constructor(props) {
      super(props);
      this.state = AppStore.getState();
      this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
      AppStore.listen(this._onChange);
  }

  componentWillUnmount() {
      AppStore.unlisten(this._onChange);
  }

  _onChange() {
      this.setState(AppStore.getState());
  }

  render() {
    var counter = 1;
    var navGroup = <NavGroup activeKey='1' onSelect={this.onSelect}>
        <NavTitle>Menu:</NavTitle>
        <NavGroupItem text="" />
      </NavGroup>;
      navGroup.props.children.pop();
    this.state.app.sidebar.forEach((sidebarEntry) => {
        var child = <NavGroupItem href={sidebarEntry.getLink()} key={counter} eventKey={counter} glyph={sidebarEntry.getGlyph()} text={sidebarEntry.getName()} />;
        navGroup.props.children.push(child);
        counter ++;
        });
      return (
        <Pane ptSize="sm" sidebar>
          { navGroup}
        </Pane>
      );
  }

}

export default Sidebar;
