import React from "react";
import {Window, Button, Input} from "react-photonkit";

class SetupEnvironment extends React.Component {

  constructor(props) {
    super(props);
    this.corbel = props.corbel
    this.FIRST_OPTION = 'firstOption'
    this.state = {
      environments: [],
      environment: this.FIRST_OPTION
    }
    this.loadState = this.loadState.bind(this)
  }

  loadState() {
    this.loadEnvironments()
  }

  loadEnvironments() {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig()
    this.setState({environments: corbelConfig.getEnvironmentNames()})
  }

  componentDidMount() {
    this.corbel.corbelStore.listen(this.loadState)
    this.loadEnvironments()
  }

  componentWillUnmount() {
    this.corbel.corbelStore.unlisten(this.loadState)
  }

  onSaveEnvironmentClick () {
    var environmentSelected = this.refs.name.refs.text.value
    if (environmentSelected.length<1) {
      return
    }

    var data = {
      name: environmentSelected,
      urlBase: this.refs.urlBase.refs.text.value
    }

    this.corbel.corbelActions.storeCorbelConfigEnvironment(data)
    this.setState({environment: data.name})
  }

  onDeleteEnvironmentClick () {
    var environmentSelected = this.refs.environmentSelect.value;
    if (environmentSelected==this.FIRST_OPTION) {
      return
    }
    this.cleanFields()
    this.corbel.corbelActions.deleteCorbelConfigEnvironment({name:environmentSelected})
    this.setState({environment: this.FIRST_OPTION})
  }

  onChangeEnvironment(event) {
    var corbelConfig = this.corbel.corbelStore.getState().backofficeCorbel.getCorbelConfig()
    var environmentSelected = this.refs.environmentSelect.value

    this.setState({environment: environmentSelected})
    if (environmentSelected==this.FIRST_OPTION) {
      this.cleanFields()
      return
    }

    this.refs.name.refs.text.value = environmentSelected
    this.refs.urlBase.refs.text.value = corbelConfig.getEnvironmentUrl(environmentSelected) || ''
  }

  cleanFields(){
    this.refs.urlBase.refs.text.value = ''
    this.refs.name.refs.text.value = ''
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
              ref="environmentSelect"
              value={this.state.environment}>
              <option value={this.FIRST_OPTION}>
                Select one environment:
              </option>
              {
                this.state.environments.map(function(environmentName) {
                  return (
                    <option value={environmentName}>
                      {environmentName}
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
