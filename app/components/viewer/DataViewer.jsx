import React from "react";

import dataViewerStore from "../../stores/DataViewerStore";
import dataViewerActions from "../../actions/DataViewerActions";

import Query from "./Query.jsx"
import Pager from "./Pager.jsx"

class DataViewer extends React.Component {

  constructor(props) {
    super(props);
    dataViewerActions.setDataCollector({dataCollector : this.props.dataCollector});
  }

  render() {
    return (
      <div>
        <Query
          dataCollector={this.props.dataCollector}
          dataViewerStore={dataViewerStore}
          dataViewerActions={dataViewerActions}/>
        <Pager
          dataCollector={this.props.dataCollector}
          dataViewerStore={dataViewerStore}
          dataViewerActions={dataViewerActions}/>
      </div>
    )
  }

}

export default DataViewer;
