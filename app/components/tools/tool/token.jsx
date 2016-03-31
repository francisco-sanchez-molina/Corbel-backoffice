import React from "react"
import {Pane, Input} from "react-photonkit"

import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/xcode'

class Token extends React.Component {

  constructor(props) {
    super(props)
    this.corbel = props.corbel
    this.state = {token:undefined}
  }

  getViewer() {
    var content
    this.ace =
    <AceEditor
      style={{
        border: '1px solid black',
        marginBottom: '5px',
        height: '200px',
        width: '300px'
      }}
      readOnly={true}
      height='100px'
      width='100%'
      maxLines='Infinity'
      mode='json'
      theme="xcode"
      name="editor:json:token"
      ref="editor:json:token"
      value={this.state.token}
      />

    if (this.refs["editor:json:token"]){
      this.refs["editor:json:token"].editor.setOption('useWorker', false)
    }
    return this.ace
  }

  onChange(event) {
    var token = this.corbel.corbelService.decodeToken(event.target.value)
    var date =  token.state ? new Date(parseInt(token.state)).toString() : ''
    this.setState(
      {
        token: JSON.stringify(token, undefined, 2),
        date: date
      }
    )
  }

  render() {
    return (
      <div className="padded">
        <h2>
          Token analyzer
        </h2>
        <Input
          label="Token"
          id="token"
          placeholder="token"
          ref="token"
          onChange={(event) => this.onChange(event)}/>
        {this.getViewer()}
        <pre>
          {this.state.date}
        </pre>
      </div>
    )
  }

}

export default Token;
