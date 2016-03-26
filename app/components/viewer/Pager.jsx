import React from "react";

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
  }

  componentWillUnmount () {
    this.props.dataViewerStore.unlisten(this.onChange);
  }

  render() {
    return (
      <div>
        <p>
          Total elements: {this.state.elements}
        </p>
        <div>
          {
            Object.keys(this.state.pages).map((page) => {
              return (
                <Page
                  data={this.state.pages[page]}
                  page={page}
                  dataViewerActions={this.props.dataViewerActions} />
              )
            })
          }
        </div>
      </div>
    )
  }

}

export default Pager;
