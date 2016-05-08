import React from "react";

import {Input, Button} from "react-photonkit";
import ScrollPane from "../../viewer/ScrollPane.jsx"
import DataViewer from "../../viewer/DataViewer.jsx"

export default class Scopes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.collection = undefined;
    this.corbel = props.route.corbel;
    this.state.dataViewer = ''
  }

  onSelectScope(event) {
    var state = {}
    state.scope = this.refs.scope.refs.text.value
    var dataAccessObject = new this.corbel.ScopesDataAccessObject(state.scope)
    state.dataViewer = <DataViewer queryEnable='false' dataAccessObject={dataAccessObject}/>
    this.setState(state)
  }

  render() {

    return (
      <ScrollPane title='Scopes'>
        <Input
          label="Scope"
          id="scope"
          placeholder="Scope name"
          ref="scope"
          onKeyPress = {(e) => {
             if (e.key === 'Enter') {
              this.onSelectScope()
            }
           }}
          />
        {this.state.dataViewer}
      </ScrollPane>
    )
  }

}

