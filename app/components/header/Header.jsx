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
    state.url = this.corbelSession.getUrl()
    state.login= this.corbelSession.getLogin()
    return state;
  }

  _onChange() {
    this.loadState();
  }

  render() {
    var leftstyle = {
      float: 'left',
      width: '75%'
    };
    var style = {
      float: 'left',
      width: '25%',
      textAlign: 'right',
      padding:'0px 5px 0px 0px'
    };
    return (
      <Toolbar title="Corbel backoffice">
        <div style={leftstyle}>
          <Actionbar>
            <ButtonGroup>
              <Button glyph="home" />
            </ButtonGroup>
          </Actionbar>
        </div>
        <div style={style}>
          <div>
            Loaded profile: {this.state.sessionProfile}
          </div>
          <div>
            Login: {this.state.login}
          </div>
          <div>
            URL: {this.state.url}
          </div>
        </div>
      </Toolbar>
    );
  }
}

export default Header;
