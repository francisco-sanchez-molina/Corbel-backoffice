import React from "react";

import {Pane, ListGroup, ListItem} from "react-photonkit";

class BackendVersion extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.route.corbel;
    this.state = this.corbel.corbelVersionStore.getState() || {};
    this._onChange = this._onChange.bind(this);
  }

  _onChange(state) {
    this.setState(state || {});
  }

  componentDidMount() {
    this.corbel.corbelVersionStore.listen(this._onChange);
  }

  componentWillUnmount() {
    this.corbel.corbelVersionStore.unlisten(this._onChange);
  }

  render() {
    var modules = Object.keys(this.state)
    var result = modules.map(module =>
      <ListItem
        title={module}
        subtitle={this.state[module]}/>
    )
    return (
      <Pane className="padded">
        <h1>Versions</h1>
        <ListGroup>
          {result}
        </ListGroup>
      </Pane>
    )
  }

}

export default BackendVersion;
