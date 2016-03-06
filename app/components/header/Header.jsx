import React from "react";
import { Toolbar, Actionbar, Button, ButtonGroup } from "react-photonkit";

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.corbel;
    this.corbelSession =  this.corbel.corbelStore.getState().backofficeCorbel.getCorbelSession();
    this.corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig();
    this.state = {};
    this.state.profiles = [];
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    this.corbel.corbelStore.listen(this._onChange);
    this.loadState();
  }

  componentWillUnmount() {
    this.corbel.corbelStore.unlisten(this._onChange);
  }

  loadState() {
    var state = this.getAppState();
    this.setState(state);
  }

  getAppState() {
    var state = {};
    state.token = this.corbelSession.getToken();
    state.refreshToken = this.corbelSession.getRefreshToken();
    state.sessionProfile = this.corbelSession.getProfile();
    state.profiles = this.corbelConfig.getProfileNames();
    state.profile = this.corbelConfig.getDefaultProfile();

    return state;
  }

  _onChange() {
    this.loadState();
  }

  render() {
    return (
      <Toolbar title="Corbel backoffice">
        <Actionbar>
          <ButtonGroup>
            <Button glyph="home" />
          </ButtonGroup>
        </Actionbar>
        <div>{this.state.sessionProfile} - {this.state.token}</div>
      </Toolbar>
    );
  }
}

export default Header;
