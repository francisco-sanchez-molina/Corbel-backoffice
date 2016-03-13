import React from "react";


class BackendVersion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.corbel = props.route.corbel;
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.loadState();
  }

  componentDidMount() {
    this.corbel.corbelVersionStore.listen(this._onChange);
    this.loadState();
  }

  componentWillUnmount() {
    this.corbel.corbelVersionStore.unlisten(this._onChange);
  }

  render() {
    return (
      <div>
        <h1>Versions</h1>
      </div>
    )
  }

}

export default BackendVersion;
