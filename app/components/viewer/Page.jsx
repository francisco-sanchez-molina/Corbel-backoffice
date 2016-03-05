import React from "react";

import JsonViewer from "./JsonViewer.jsx"

class Page extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={this.props.style}>
        <p>Page {this.props.page}</p>
        {
          this.props.data.map(function(element) {
            return (<JsonViewer data={element}/>)
          })
        }
      </div>
    )
  }

}

export default Page;
