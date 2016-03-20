import React from 'react'
import {Button, Icon} from "react-photonkit";

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/xcode';

class JsonEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  save(data){
    this.props.dataViewerActions.updateObject(data);
  }

  getEditor() {
    var content;
    if (this.state.edit) {
      content = this.state.value
    } else {
      content = JSON.stringify(this.props.data, null, 2)
    }
    return <AceEditor
      style={{
        border: '1px solid black',
        marginBottom: '5px',
        height: '200px',
        width: '300px'
      }}
      readOnly={this.state.edit ? undefined : 'true'}
      height='100px'
      width='100%'
      maxLines='Infinity'
      mode="json"
      theme="xcode"
      name={"editor:page:" + this.props.page + ":index:"+ this.props.element}
      ref='editor'
      value={content}
      onChange={(newValue) => this.setState({value: newValue})}
      onKeyDown={() => this.setState({edit:false}) }
      />
  }

  getReadingStateContorls() {
    return <div>
      <Button
        onClick={() => {
          this.setState({edit:true,
            value: JSON.stringify(this.props.data, null, 2)
          })
        }}
        class="btn btn-form btn-primary"
        text="Edit"/>
    </div>
  }

  getEditingStateContorls() {
    return <div>
      <Button
        onClick={() => this.setState({edit:false})}
        class="btn btn-form btn-primary"
        text="Cancel"/>
      <Button
        onClick={() => this.save({original: this.props.data, new: JSON.parse(this.state.value) })}
        class="btn btn-form btn-primary"
        text="Save"/>
    </div>
  }

  getControls() {
    return this.state.edit ? this.getEditingStateContorls() : this.getReadingStateContorls()
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
