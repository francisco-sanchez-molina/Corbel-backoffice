import React from 'react'
import Textarea from 'react-textarea-autosize'

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
      content = <Textarea width='100%'>{JSON.stringify(that.props.data, null, 2)}</Textarea>
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
