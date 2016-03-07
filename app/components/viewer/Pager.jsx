import React from "react";

import JsonViewer from "./JsonViewer.jsx"
import Page from "./Page.jsx"

class Pager extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.dataViewerStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  onChange(state) {
    this.setState(state || {});
  }

  componentDidMount() {
    this.props.dataViewerStore.listen(this.onChange);
    this.props.dataViewerActions.fetchNextPage();
  }

  componentWillUnmount () {
    this.props.dataViewerStore.unlisten(this._onChange);
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
      this.props.dataViewerActions.fetchNextPage();
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
