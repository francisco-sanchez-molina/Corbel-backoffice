import React from "react"
import {Pane, Input} from "react-photonkit"

class Token extends React.Component {

  constructor(props) {
    super(props)
    this.corbel = props.corbel
    this.state = {token:undefined}
  }

  onChange(event) {
    var token = this.corbel.corbelService.decodeToken(event.target.value)
    this.setState({token: JSON.stringify(token, undefined, 2)})
  }

  render() {
    return (
      <div className="padded">
        <h2>Token analyzer</h2>
          <Input
            label="Token"
            id="token"
            placeholder="token"
            ref="token"
            onChange={(event) => this.onChange(event)}/>
          <pre>{this.state.token}</pre>
        </div>
    )
  }

}

export default Token;
