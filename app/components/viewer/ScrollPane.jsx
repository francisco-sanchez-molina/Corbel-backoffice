import React from "react";

import dataViewerStore from "../../stores/DataViewerStore"
import dataViewerActions from "../../actions/DataViewerActions"

class ScrollPane extends React.Component {

  constructor(props) {
    super(props);
    this.state = dataViewerStore.getState()
    this.onChange = this.onChange.bind(this)
  }
  onChange(state) {
    this.setState(state || {});
  }

  componentDidMount() {
    dataViewerStore.listen(this.onChange);
  }

  componentWillUnmount () {
    dataViewerStore.unlisten(this.onChange);
  }

  scrollState(event) {
    if (this.state.disableScrollCheck) {
      return;
    }

    var componentHeight = this.refs.scrolled.clientHeight;
    var height = this.refs.scrolled.scrollHeight - componentHeight;
    var top = this.refs.scrolled.scrollTop;
    var percentage = 100 - 100 * (height - top) / height;

    if (percentage > 80) {
      dataViewerActions.fetchNextPage();
    }
  }

  render() {
    var style = {
      height: '100%',
      width: '100%',
      overflow: 'auto',
    }
    return (
      <div className='padded' style={style} ref='scrolled' className="padded" onScroll={(e) => {this.scrollState(e)}}>
        <h1>{this.props.title}</h1>
        {this.props.children}
      </div>
    )
  }

}

export default ScrollPane;
