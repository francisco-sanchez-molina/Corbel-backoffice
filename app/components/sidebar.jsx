import React from "react"
import { Pane, NavGroup, NavTitle, NavGroupItem } from "react-photonkit"


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.entries = props.entries;
  }

  render() {
    var counter = 1;
    var navGroup =
    <NavGroup activeKey='1' onSelect={this.onSelect}>
      <NavTitle>Menu:</NavTitle>
      <NavGroupItem text="" />
    </NavGroup>
    navGroup.props.children.pop();
    this.entries.forEach((sidebarEntry) => {
      var child =
      <NavGroupItem
        href={sidebarEntry.getLink()}
        key={counter}
        eventKey={counter}
        glyph={sidebarEntry.getGlyph()}
        text={sidebarEntry.getName()} />
      ;
      navGroup.props.children.push(child);
      counter ++;
    });
    return (
      <Pane ptSize="sm" sidebar>
        {navGroup}
      </Pane>
    );
  }

}

export default Sidebar;
