import React from "react";

import JsonEditor from "./JsonEditor.jsx"

class Page extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={this.props.style}>
        <p>
          Page {this.props.page}
        </p>
        {
          this.props.data.map((element, index) => {
            return (
              <JsonEditor
                data={element}
                page={this.props.page}
                element={index}
                dataViewerActions={this.props.dataViewerActions}/>
            )
          })
        }
      </div>
    )
  }

}

export default Page;
