import React from "react";

import {Input} from "react-photonkit";

import Pager from "../viewer/Pager.jsx"

class Resources extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.collection='books:Book';
    this.corbel = props.route.corbel;
  }

  handleChange(event) {
    var state = {};
    state.collection = event.target.value;
    this.setState(state);
  }

  render() {
    var dataCollector = new this.corbel.ResourcesDataCollector(this.state.collection);
    var pager = <Pager dataCollector={dataCollector}/>;

    return (
      <div>
        <h1>Resources</h1>
        <Input
          label="Url base"
          id="urlBase"
          placeholder="Url base"
          value="books:Book"
          onChange={(event) => this.handleChange(event)}/>
          {pager}
      </div>
    )
  }

}

export default Resources;
