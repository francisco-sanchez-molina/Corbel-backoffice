import React from 'react'
import Textarea from 'react-textarea-autosize'
import {Icon} from "react-photonkit";

class JsonViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.edit = false;
  }

  edit(data) {
    if (!this.state.edit) {
      this.setState({change:JSON.stringify(data, null, 2), edit:true})
    }
  }

  onChange(content) {
    var state = {change: content}
    this.setState(state)
  }

  checkAndFormat (){
    var state = {change :  JSON.stringify(JSON.parse(this.state.change), null, 2)}
    this.setState(state)
  }

  save () {
    var content = JSON.parse(this.state.change)
    var state = {saving : true}
    this.setState(state)
    console.log('save ' + content)
  }

  render() {
    var textareaStyle = {
      padding: '10px 8px',
      border: '1px solid rgba(39,41,43,.15)',
      borderRadius: 4,
      fontSize: 15
    };

    var that = this;
    var content;
    if (this.state.edit) {
      content =
      <div>
        <Textarea
          style={textareaStyle}
          ref='textArea'
          width='100%'
          value={this.state.change}
          onChange={event => this.onChange(event.target.value)}
          onKeyDown={event => this.setState({edit:event.key!='Escape'}) } />
        <div>
          <Icon glyph='floppy' title='save' onClick={event => this.save()}/>
          <Icon
            glyph='check'
            title='check and format'
            onClick={event => this.checkAndFormat()}/>
        </div>
      </div>
    } else {
      content =
      <div>
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
          onClick={() => that.edit(that.props.data)}>
          {content}
        </div>
      </div>
    )
  }

}

export default JsonViewer;
