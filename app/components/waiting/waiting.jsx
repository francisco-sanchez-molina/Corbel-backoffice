import React from "react";

import WaitingStore from '../../stores/WaitingStore'
import WaitingActions from '../../actions/WaitingActions'

import {Button} from 'react-photonkit'


class Waiting extends React.Component {

  constructor(props) {
    super()
    this.module = props.name
    this._onChange = this._onChange.bind(this)
    this.state = WaitingStore.getState(this.module) || {}
  }

  _onChange() {
    this.setState(WaitingStore.getState(this.module) || {})
  }

  componentDidMount() {
    WaitingStore.listen(this._onChange);
  }

  componentWillUnmount() {
    WaitingStore.unlisten(this._onChange);
  }

  render() {
    var style = {
      position:   'fixed',
      zIndex:    1000,
      top:        0,
      left:       0,
      height:     '100%',
      width:      '100%',
      background: 'rgba( 255, 255, 255, .8 ) url(\'assets/loading.gif\') 50% 50% no-repeat'
    }

    var textStyle = {
      position:   'fixed',
      top:        '42%',
      left:       '55%',
      height:     '100%',
      width:      '100%',
    }

    var fail = (this.state[this.module] || {}).error
    if (fail) {
      var failMessage = JSON.stringify(fail)
      if (failMessage === '{}') {
        try {
          fail = fail.toString()
        } catch(error){}
      }
      else {
        fail = failMessage
      }
    } else {
      fail = ''
    }

    var content = ''

    if (this.state[this.module] && this.state[this.module].wait) {
      content =
      <div style={style}>
        <div style={textStyle}>
          <h2>processing...</h2>
          <Button
            onClick={() => WaitingActions.abortPromise(this.module)}
            class="btn btn-form btn-primary"
            text="cancel" />
        </div>
      </div>
    }

    return (
      <div>
        {fail}
        {content}
        {this.props.children}
      </div>
    )
  }
}

export default Waiting;
