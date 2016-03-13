import React from "react";

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
    var modules = Object.keys(this.state);
    var result = modules.map(module =>
      <div>{module} {this.state[module]}</div>
    )
    return (
      <div>
        <h1>Versions</h1>
        {result}
      </div>
    )
  }

}

export default BackendVersion;
