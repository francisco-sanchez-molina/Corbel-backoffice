import React from "react"
import { Pane, NavTitle, NavGroupItem } from "react-photonkit"


class Sidebar extends React.Component {

  render() {
    return (
      <Pane ptSize="sm" sidebar>
        <nav  ref="navs">
          <NavTitle>Menu:</NavTitle>
          {
            this.props.entries.map(function(sidebarEntry, counter) {
              return (
                <NavGroupItem
                  href={sidebarEntry.getLink()}
                  key={counter}
                  eventKey={counter}
                  glyph={sidebarEntry.getGlyph()}
                  text={sidebarEntry.getName()} />
              )
            })
          }
        </nav>
      </Pane>
    );
  }

}

export default Sidebar;
