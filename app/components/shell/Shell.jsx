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
    this.corbelMethods = {'corbel' : {}}
    this.state = {result:''}
    this.context = {}
    this.history = []
    this.historyPos = 0
    this.sandboxframe = document.createElement('iframe')
    this.init('corbel', this.corbel.corbelService.getDriver(), this.corbelMethods)
  }

  init(path, obj, map) {
    var keys = Object.keys(obj)
    var protoKeys = Object.keys(obj.__proto__)
    protoKeys.forEach(key => keys.push(key))

    keys
    .filter(key => ['guid', 'config', 'driver', '_events', '__proto__', 'constructor'].indexOf(key)===-1)
    .forEach((key) => {
      map[path][key] = {}
      this.init(key, obj[key], map[path])
    })
  }

  keyup() {
    if (0===this.history.length) {
      return
    }
    if (this.historyPos===this.history.length) {
      this.current = this.state.editorContent
    }
    if (this.historyPos>0) {
      this.historyPos-=1
    }
    var item = this.history[this.historyPos]
    this.updateContent(item)
  }

  keydown() {
    if (this.historyPos<this.history.length) {
      this.historyPos+=1
      if (this.historyPos===this.history.length && this.current) {
        this.updateContent(this.current)
      }
      else {
        var item = this.history[this.historyPos]
        this.updateContent(item)
      }
    }
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
      enableSnippets={true}
      onChange={(newValue) => this.updateContent(newValue)}
      value={this.state.editorContent}
      />

    var langTools = ace.acequire("ace/ext/language_tools")

    var that = this;
    var flowCompleter = {
      getCompletions: function(editor, session, pos, prefix, callback) {
        var content = editor.getValue()
        var tokens = content.split('.')
        var values=[]
        var actualKey = that.corbelMethods;
        tokens.forEach(function(token) {
          if (actualKey[token]) {
            actualKey = actualKey[token]
          } else {
            values = Object.keys(actualKey)
            actualKey = {}
          }
        })

        var words = values.map((method) => {return {name: method, value: method, score: 1, meta:'corbel'}})
        callback(null, words)

      }
    }
    langTools.setCompleters()
    langTools.addCompleter(flowCompleter)


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
    this.history.push(this.state.editorContent)
    this.historyPos = this.history.length
    this.refs.iframe.contentWindow['corbel'] = this.corbel.corbelService.getDriver()
    var ret
    try {
      ret = this.refs.iframe.contentWindow.eval(this.state.editorContent)
      if (ret.toString()==='[object Promise]') {
        var promise = ret
        var promiseDate = Date.now()
        promise.then(data => {
          var text = this.state.result
          text = text.replace('Promise:' + promiseDate + ' waiting', JSON.stringify(data))
          this.setState({result : text})
        }).catch(error => {
          var text = this.state.result
          text = text.replace('Promise:' + promiseDate + ' waiting', JSON.stringify(error))
          this.setState({result : text})
        })
        ret = 'Promise:' + promiseDate + ' waiting'
      }
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
          <div
            onKeyPress = {(e) => {
              if (e.key === 'Enter') {
                this.exec()
              }
            }}
            onKeyUp = { e => {
              //38 keyup
              if (e.keyCode === 38)
              this.keyup()
              if (e.keyCode === 40)
              this.keydown()
            } }
            >
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
