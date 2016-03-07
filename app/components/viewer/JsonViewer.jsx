import React from "react";

class JsonViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.edit = false;
  }

  editUser(data) {
    this.setState({edit:true});
    console.log(data);
  }

  render() {
    var that = this;
    var content;
    if (this.state.edit) {
      content = <div>
          {JSON.stringify(that.props.data, null, 2)}
      </div>
    } else {
      content = <div>
        <pre>
          {JSON.stringify(that.props.data, null, 2)}
        </pre>
      </div>
    }
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
          {content}
        </div>
      </div>
    )
  }

}

export default JsonViewer;
