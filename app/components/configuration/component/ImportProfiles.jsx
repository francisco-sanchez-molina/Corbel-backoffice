import React from "react";
import {Window, Button, Input} from "react-photonkit";

class ImportProfiles extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.corbel
    this.state = {}
  }

  onImport() {
    if (this.state.data) {
      this.corbel.corbelActions.importConfiguration(this.state.data)
      this.refs.file.value=''
    }
  }

  onExport(){
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig()
    var content = window.btoa(corbelConfig.serialize())
    var data = new Blob([content], {type: 'octet/stream'})
    var url = window.URL.createObjectURL(data)
    var tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', 'corbel-backoffie-profiles.data');
    tempLink.click()

  }

  handleFile(e) {
    var reader = new FileReader()
    reader.onload = function(upload) {
      this.setState({
        data: window.atob(upload.target.result)
      })
    }.bind(this)
    reader.readAsText(e.target.files[0])
  }

  render() {
    return (
      <div>
        <h1>
          Import / Export profiles
        </h1>
        <div>
          <Button
            onClick={() => this.onImport()}
            class="btn btn-form btn-primary"
            text="Import"/>
          <input ref='file' type="file" onChange={(event) => this.handleFile(event)} />

          <Button
            onClick={() => this.onExport()}
            class="btn btn-form btn-primary"
            text="Export"/>
        </div>
      </div>

    )
  }

}

export default ImportProfiles;
