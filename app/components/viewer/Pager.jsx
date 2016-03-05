import React from "react";

import JsonViewer from "./JsonViewer.jsx"
import Page from "./Page.jsx"

class Pager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.disableScrollCheck = true;
    this.state.lastPageLoaded=-1;
  }

  setDataForPage(page, data) {
    var state = {}
    state.disableScrollCheck = false;
    state['Page_' + page] = {data: data, page:page};
    this.setState(state);
  }

  setFailDataForPage(page, data) {
    var state = {}
    state.disableScrollCheck = false;
    state['Page_' + page] = {data: [{status:'fail', cause: data}], page:page};
    this.setState(state);
  }

  componentDidMount() {
    this.loadNextPage();
  }

  loadNextPage() {
    var state = {};
    state.disableScrollCheck=true;
    var loadPage = this.state.lastPageLoaded + 1;
    state.lastPageLoaded = loadPage;

    var updateFunction = this.setDataForPage.bind(this, loadPage);
    var failFunction = this.setFailDataForPage.bind(this, loadPage);
    this.props.dataCollector.fetchPage(loadPage).then(updateFunction).catch(failFunction);
    state['Page_' + loadPage] = {data: [{status:'loading'}], page:loadPage};
    this.setState(state);
  }

  componentWillUnmount () {
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
      this.loadNextPage();
    }
  }

  render() {
    var that = this;
    var style = {
      height: '500px',
      overflow: 'auto',
    }
    return (
      <div ref="pager" style={style} onScroll={(e) => {this.scrollState(e)}}>
        {
          Object.keys(this.state).filter((t) => t.startsWith('Page_')).map(function(page) {
            return (
                  <Page data={that.state[page].data} page={that.state[page].page} />
                  )
                  })
        }
      </div>
    )
  }

}

export default Pager;
