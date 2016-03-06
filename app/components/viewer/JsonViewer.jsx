import React from "react";

class JsonViewer extends React.Component {

  constructor(props) {
    super(props);
  }

  editUser(data) {
    console.log(data);
  }

  render() {
    var that = this;
    var divPad = {
      padding: '10px 10px 10px 5px'
    };
    var divStyle = {
      display: 'block',
      backgroundColor: 'WhiteSmoke'
    };
    return (
      <div style={divPad}>
        <div
          style={divStyle}
          onClick={() => that.editUser(that.props.data)}>
          <div>
            <pre>
              {JSON.stringify(that.props.data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    )
  }

}

export default JsonViewer;
