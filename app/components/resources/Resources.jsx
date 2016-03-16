import React from "react";

import {Input, Button} from "react-photonkit";

import DataViewer from "../viewer/DataViewer.jsx"

class Resources extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.collection = undefined;
    this.corbel = props.route.corbel;
  }

  onSelectCollection(event) {
    var state = {}
    state.collection = this.refs.collection.refs.text.value
    this.setState(state)
  }

  render() {
    var dataViewer = ''
    if (this.state.collection) {
      var dataAccessObject = new this.corbel.ResourcesDataAccessObject(this.state.collection);
      dataViewer =
      <DataViewer dataAccessObject={dataAccessObject}/>
    }

    return (
      <div>
        <h1>Resources</h1>
        <Input
          label="Collection"
          id="collection"
          placeholder="Collection name"
          ref="collection" />
        <Button
          onClick={() => this.onSelectCollection()}
          class="btn btn-form btn-primary"
          text="Select Collection!"/>
        {dataViewer}
      </div>
    )
  }

}

export default Resources;
