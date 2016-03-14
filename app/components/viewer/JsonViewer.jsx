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

  onChange(content) {
      this.state.change = content
      this.setState(this.state)
      console.log(content)
  }

  render() {
    var that = this;
    this.state.data = this.state.change || JSON.stringify(this.props.data, null, 2)
    var content;
    if (this.state.edit) {
      content = <Textarea ref='textArea' width='100%' value={this.state.data} onChange={e => this.onChange(e.target.value)} />
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
