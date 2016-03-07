import React from "react";

import dataViewerStore from "../../stores/DataViewerStore";
import dataViewerActions from "../../actions/DataViewerActions";

import JsonViewer from "./JsonViewer.jsx"
import Page from "./Page.jsx"

class Pager extends React.Component {

  constructor(props) {
    super(props);
    this.state = dataViewerStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  onChange(state) {
    this.setState(state || {});
  }

  componentDidMount() {
    dataViewerStore.listen(this.onChange);
    dataViewerActions.fetchNextPage();

  }

  componentWillUnmount () {
    dataViewerStore.unlisten(this._onChange);
  }

  scrollState(event) {
    if (this.state.disableScrollCheck) {
      return;
    }
    var componentHeight = this.refs.pager.clientHeight;
    var height = this.refs.pager.scrollHeight - componentHeight;
    var top = this.refs.pager.scrollTop;
    var percentage = 100 - 100*(height - top)/height;

    if (percentage > 80) {
      dataViewerActions.fetchNextPage();
    }
  }

  render() {
    var that = this;
    var style = {
      height: '500px',
      overflow: 'auto',
    }
    return (
      <div
        ref="pager"
        style={style}
        onScroll={(e) => {this.scrollState(e)}}>
        {
          Object.keys(this.state).filter((t) => t.startsWith('Page_')).map(function(page) {
            return (
              <Page
                data={that.state[page].data}
                page={that.state[page].page} />
            )
          })
        }
      </div>
    )
  }

}

export default Pager;
