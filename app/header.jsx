import React from "react";
import { Toolbar, Actionbar, Button, ButtonGroup } from "react-photonkit";

class Header extends React.Component {
  render() {
    return (
      <Toolbar title="Corbel backoffice">
        <Actionbar>
          <ButtonGroup>
            <Button glyph="home" />
          </ButtonGroup>
        </Actionbar>
      </Toolbar>
    );
  }
}

export default Header;
