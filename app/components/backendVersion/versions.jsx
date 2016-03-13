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
    var r = JSON.stringify(this.state)
    return (
      <div>
        <h1>Versions</h1>
        {r}
      </div>
    )
  }

}

export default BackendVersion;
