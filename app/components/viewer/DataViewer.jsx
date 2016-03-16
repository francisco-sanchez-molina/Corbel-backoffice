import React from "react";

import dataViewerStore from "../../stores/DataViewerStore";
import dataViewerActions from "../../actions/DataViewerActions";

import Query from "./Query.jsx"
import Pager from "./Pager.jsx"

class DataViewer extends React.Component {

  constructor(props) {
    super(props);
    dataViewerActions.setDataAccessObject({dataAccessObject : this.props.dataAccessObject});
  }

  render() {
    return (
      <div>
        <Query
          dataAccessObject={this.props.dataAccessObject}
          dataViewerStore={dataViewerStore}
          dataViewerActions={dataViewerActions}/>
        <Pager
          dataAccessObject={this.props.dataAccessObject}
          dataViewerStore={dataViewerStore}
          dataViewerActions={dataViewerActions}/>
      </div>
    )
  }

}

export default DataViewer;
