import React from "react";
import {Window, Button, Input} from "react-photonkit";

class SetupEnvironment extends React.Component {

  constructor(props) {
    super(props);
    this.FIRST_OPTION = 'firstOption';
    this.corbel = props.corbel;
    this.state = {};
    this.state.environments = [];
    this.loadState = this.loadState.bind(this);
  }

  loadState() {
    this.onChangeEnvironment();
    this.loadEnvironments();
  }

  loadEnvironments() {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig();
    var state = {};
    state.environments = corbelConfig.getEnvironmentNames();
    this.setState(state);
  }

  componentDidMount() {
    this.corbel.corbelStore.listen(this.loadState);
    this.loadEnvironments();
  }

  componentWillUnmount() {
    this.corbel.corbelStore.unlisten(this.loadState);
  }

  onSaveEnvironmentClick () {
    var data = {};
    data.name = this.refs.name.refs.text.value;
    data.urlBase = this.refs.urlBase.refs.text.value;
    this.corbel.corbelActions.storeCorbelConfigEnvironment(data);
  }

  onDeleteEnvironmentClick () {
    var environmentSelected = this.refs.environmentSelect.value;
    if (environmentSelected==this.FIRST_OPTION) {
      return
    }
    this.refs.environmentSelect.value = this.FIRST_OPTION;
    this.corbel.corbelActions.deleteCorbelConfigEnvironment({name:environmentSelected});
  }

  onChangeEnvironment(event) {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig();
    var environmentSelected = this.refs.environmentSelect.value || state.environments[0];
    if (environmentSelected==this.FIRST_OPTION) {
      this.cleanFields();
      return;
    }
    this.refs.urlBase.refs.text.value = corbelConfig.getEnvironmentUrl(environmentSelected) || ''
    this.refs.name.refs.text.value = environmentSelected
  }

  cleanFields(){
    this.refs.urlBase.refs.text.value = '';
    this.refs.name.refs.text.value = '';
  }

  render() {
    return (
      <div>

        <h2>Environment</h2>
        <div>
          <div style={{margin: '5px', heigth:'auto', verticalAlign: 'middle', width:'200px', float:'left'}}>

            <select
              onChange={(event) => this.onChangeEnvironment(event)}
              className="form-control"
              ref="environmentSelect">
              <option value={this.FIRST_OPTION}>
                Select one environmet:
              </option>
              {
                this.state.environments.map(function(environmetName) {
                  return (
                    <option value={environmetName}>
                      {environmetName}
                    </option>
                  )
                })
              }
            </select>
          </div>
          <div style={{margin: '5px', heigth:'auto', verticalAlign: 'middle', float: 'left'}}>
            <Button
              onClick={() => this.onDeleteEnvironmentClick()}
              class="btn btn-form btn-primary"
              ptStyle="negative"
              glyph="trash"
              text="Delete"/>
          </div>
          <div style={{display: 'block', clear: 'both'}} />
        </div>


        <Input
          label="Name"
          id="name"
          placeholder="name"
          ref="name" />
        <Input
          label="Url base"
          id="urlBase"
          placeholder="Url base"
          ref="urlBase"/>

        <div>
          <Button
            onClick={() => this.onSaveEnvironmentClick()}
            class="btn btn-form btn-primary"
            ptStyle="positive"
            glyph="floppy"
            text="Save"/>
        </div>

      </div>
    )
  }

}

export default SetupEnvironment;
