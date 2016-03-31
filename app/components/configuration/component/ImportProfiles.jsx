import React from "react";
import {Window, Button, Input} from "react-photonkit";

class ImportProfiles extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.corbel
    this.state = {}
  }

  onExport(){
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig()
    var corbelConfigSerialized = window.btoa(corbelConfig.serialize())
    var content = JSON.stringify({corbelConfig: corbelConfigSerialized})
    var data = new Blob([content], {type: 'octet/stream'})
    var url = window.URL.createObjectURL(data)
    var tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', 'corbel-backoffie-profiles.data');
    tempLink.click()
  }

  tryLoadConfig(name, content) {
    try{
      content = JSON.parse(content)
      if (content.corbelConfig) {
        this.onImport(window.atob(content.corbelConfig))
        this.setState({import: ' ' + name + ' imported!'})
      } else {
        this.setState({import: ' ' + name + ' fail!'})
      }
    }catch(error) {
      this.setState({import: ' ' + name + ' fail!'})
    }
  }

  handleFile(e) {
    var reader = new FileReader()
    reader.onload = function(file, upload) {
      var content = upload.target.result
      this.tryLoadConfig(file.name, content)
    }.bind(this, e.target.files[0])
    reader.readAsText(e.target.files[0])
  }

  onImport(data) {
    this.corbel.corbelActions.importConfiguration(data)
    this.refs.file.value=''
  }

  onTextualConfigurationChange(event) {
    this.tryLoadConfig('clipboard', event.target.value)
  }

  render() {
    return (
      <div>
        <h1>
          Import / Export profiles
        </h1>
        <div>
          <input
            style={{position:'absolute', visibility:'hidden'}}
            ref='file'
            type="file"
            onChange={(event) => this.handleFile(event)} />
          <p>
            <Button
              glyph="download"
              onClick={() => this.refs.file.click()}
              class="btn btn-form btn-primary"
              text="Import"/>
            {this.state.import}
          </p>
          <p>
            <Button
              glyph="upload"
              onClick={() => this.onExport()}
              class="btn btn-form btn-primary"
              text="Export"/>
          </p>
          <Input
            label="Paste configuration here:"
            id="textualConfiguration"
            placeholder="configuration"
            ref="textualConfiguration"
            value=""
            onChange={(event) => this.onTextualConfigurationChange(event)}/>
        </div>
      </div>

    )
  }

}

export default ImportProfiles;
