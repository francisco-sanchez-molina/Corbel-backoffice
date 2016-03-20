import React from 'react'
import {Button, Icon} from "react-photonkit";

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/xcode';

class JsonEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {status:'reading'};
  }

  save(newData){
    var data = {
      old: this.props.state.data,
      new: newData,
      page: this.props.page,
      index: this.props.index
    }
    this.props.dataViewerActions.updateObject(data);

  }

  getEditor() {
    var content;
    if (this.state.status==='editing') {
      content = this.state.editorContent
    } else {
      content = JSON.stringify(this.props.state.data, null, 2)
    }
    return <AceEditor
      style={{
        border: '1px solid black',
        marginBottom: '5px',
        height: '200px',
        width: '300px'
      }}
      readOnly={this.state.status!=='editing' ? 'true' : undefined}
      height='100px'
      width='100%'
      maxLines='Infinity'
      mode="json"
      theme="xcode"
      name={"editor:page:" + this.props.page + ":index:"+ this.props.index}
      ref='editor'
      value={content}
      editorProps={{$blockScrolling: true}}
      onChange={(newValue) => this.setState({editorContent: newValue})}
      onKeyDown={() => this.setState({status:'reading'}) }
      />
  }

  getReadingStateContorls() {
    return <div>
      <Button
        onClick={() => {
          this.setState({status:'editing',
            editorContent: JSON.stringify(this.props.state.data, null, 2)
          })
        }}
        class="btn btn-form btn-primary"
        text="Edit"/>
    </div>
  }

  getEditingStateContorls() {
    return <div>
      <Button
        onClick={() => this.setState({status:'reading'})}
        class="btn btn-form btn-primary"
        text="Cancel"/>
      <Button
        onClick={() => this.save(JSON.parse(this.state.editorContent))}
        class="btn btn-form btn-primary"
        text="Save"/>
      <p>{this.props.state.status}</p>
    </div>
  }

  getControls() {
    if (this.state.status==='editing') {
      return this.getEditingStateContorls()
    } else if(this.state.status==='reading') {
      return this.getReadingStateContorls()
    }
  }

  render() {
    var that = this;
    var content;

    var divPad = {
      padding: '10px 10px 10px 5px'
    };

    var divStyle = {
      display: 'block',
      backgroundColor: 'WhiteSmoke'
    };

    var editor

    return (

      <div style={divPad}>
        <div style={divStyle}>
          <div style={{
              padding: '10px 10px 10px 10px'
            }}>
            <div style={{
                float: 'left',
                width: '90%'
              }}>
              {this.getEditor()}
            </div>
            <div  style={{
                float: 'left',
                width: '10%',
                padding: '10px 10px 10px 10px'
              }}>
              {this.getControls()}
            </div>
            <div style={{display: 'block', clear: 'both'}}>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default JsonEditor;
