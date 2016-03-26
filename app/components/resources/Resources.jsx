import React from "react";

import {Input, Button} from "react-photonkit";
import ScrollPane from "../viewer/ScrollPane.jsx"
import DataViewer from "../viewer/DataViewer.jsx"

class Resources extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.collection = undefined;
    this.corbel = props.route.corbel;
    this.state.dataViewer = ''
  }

  onSelectCollection(event) {
    var state = {}
    state.collection = this.refs.collection.refs.text.value
    var dataAccessObject = new this.corbel.ResourcesDataAccessObject(state.collection)
    state.dataViewer = <DataViewer dataAccessObject={dataAccessObject}/>
    this.setState(state)
  }

  render() {

    return (
      <ScrollPane title='Resources'>
        <Input
          label="Collection"
          id="collection"
          placeholder="Collection name"
          ref="collection"
          onKeyPress = {(e) => {
             if (e.key === 'Enter') {
              this.onSelectCollection()
            }
           }}
          />
        {this.state.dataViewer}
      </ScrollPane>
    )
  }

}

export default Resources;
