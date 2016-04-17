import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";
import Paper from 'material-ui/Paper'

import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/xcode'

class Shell extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.route.corbel;
    this.state = {result:''}
    this.context = {}
    this.sandboxframe = document.createElement('iframe')
  }

  getEditor() {
    this.ace =
    <AceEditor
      style={{
        border: '1px solid black',
        marginBottom: '5px',
        height: '200px',
        width: '300px'
      }}
      readOnly={false}
      height='100px'
      width='100%'
      maxLines='4'
      mode='javascript'
      theme="xcode"
      name="code"
      ref="code"
      enableLiveAutocompletion={true}
      enableBasicAutocompletion={true}
      onChange={(newValue) => this.updateContent(newValue)}
      value={this.state.editorContent}
      />

    return this.ace
  }

  updateContent(newValue) {
    if (newValue !== '\n') {
      this.setState({editorContent: newValue})
    }else {
      this.setState({editorContent: undefined})
    }
  }


  getViewer() {
    this.ace =
    <AceEditor
      style={{
        border: '1px solid black',
        marginBottom: '5px',
        height: '200px',
        width: '300px'
      }}
      readOnly={false}
      height='100px'
      width='100%'
      maxLines='10'
      mode='javascript'
      theme="xcode"
      name="viewer"
      ref="viewer"
      value={this.state.result}
      />
    return this.ace
  }

  exec() {
    this.refs.iframe.contentWindow['corbel'] = this.corbel.corbelService.getDriver()
    var ret
    try {
      ret = this.refs.iframe.contentWindow.eval(this.state.editorContent)
    } catch(error) {
      ret = error
    }
    var result = this.state.result + this.state.editorContent + '\n  ' + ret + '\n\n'
    this.setState({result : result, editorContent:undefined})
  }

  render() {
    return (
      <Pane className="padded">
        <div style={{
            padding: '0px 5px 5px 5px',
            height: '100%'
          }}>
          <h3>shell</h3>
          <div           onKeyPress = {(e) => {
              if (e.key === 'Enter') {
                this.exec()
              }
            }}>
            {this.getEditor()}
            <h4>Output:</h4>
            {this.getViewer()}
          </div>
        </div>
        <iframe
          style={{visibility:'hidden'}}
          ref='iframe' />
      </Pane>
    )
  }

}

export default Shell;
