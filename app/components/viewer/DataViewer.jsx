import React from "react";

import dataViewerStore from "../../stores/DataViewerStore";
import dataViewerActions from "../../actions/DataViewerActions";

import Query from "./Query.jsx"
import Pager from "./Pager.jsx"

class DataViewer extends React.Component {

  constructor(props) {
    super(props)
    this.componentDidUpdate()
  }

  componentDidUpdate() {
    if (this.props.dataAccessObject.hasDriver()) {
      dataViewerActions.setDataAccessObject({dataAccessObject : this.props.dataAccessObject})
    }
  }
  
  queryComponent() {
    var queryComponent
    if (this.props.queryEnable=== undefined || this.props.queryEnable===true || this.props.queryEnable==='true') {
         queryComponent = <Query
          dataAccessObject={this.props.dataAccessObject}
          dataViewerStore={dataViewerStore}
          dataViewerActions={dataViewerActions}/>
        }
    return queryComponent
  }

  componentsDataViewer () {
    var that = this
    return (
      <div>
        {this.queryComponent()}
        <Pager
          dataAccessObject={this.props.dataAccessObject}
          dataViewerStore={dataViewerStore}
          dataViewerActions={dataViewerActions}/>
      </div>
    )
  }

  componentsDataLogin () {
    return (
      <div>
        Login first
      </div>
    )
  }

  render() {
    return this.props.dataAccessObject.hasDriver() ? this.componentsDataViewer() : this.componentsDataLogin()
  }

}

export default DataViewer;
