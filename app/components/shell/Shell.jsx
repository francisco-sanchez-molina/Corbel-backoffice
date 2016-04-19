import React from "react";
import {Window, Button, Pane, Input} from "react-photonkit";
import Paper from 'material-ui/Paper'

import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/xcode'
require("brace/ext/language_tools");

class Shell extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.route.corbel;
    this.corbelMethods = ['corbel']
    this.state = {result:''}
    this.context = {}
    this.sandboxframe = document.createElement('iframe')
    this.init('corbel', this.corbel.corbelService.getDriver())
  }

  init(path, obj) {
    var keys = Object.keys(obj)
    var protoKeys = Object.keys(obj.__proto__)
    protoKeys.forEach(key => keys.push(key))

    keys
    .filter(key => ['guid', 'config', 'driver', '_events', '__proto__', 'constructor'].indexOf(key)===-1)
    .forEach((key) => {
      var newPath = path + '.' +key
      this.corbelMethods.push(newPath)
      this.init(newPath, obj[key])
    })
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

      var langTools = ace.acequire("ace/ext/language_tools");

      var that = this;
      var flowCompleter = {
          getCompletions: function(editor, session, pos, prefix, callback) {
            var words = that.corbelMethods.map((method) => {return {name: method, value: method, score: 1, meta:'corbel'}})
            callback(null, words)

          }
      }
      langTools.addCompleter(flowCompleter);


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
          <div onKeyPress = {(e) => {
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
