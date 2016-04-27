import React from "react";

import RefreshIndicator from 'material-ui/RefreshIndicator'


import {Button} from 'react-photonkit'


class Waiting extends React.Component {

  constructor(props) {
    super()
    this.module = props.name
  }

  render() {
    var style = {
      position:   'fixed',
      zIndex:    1000,
      top:        0,
      left:       0,
      height:     '100%',
      width:      '100%',
      background: 'rgba( 255, 255, 255, .8 )'
    }

    var textStyle = {
      position:   'fixed',
      top:        '42%',
      left:       '55%',
      height:     '100%',
      width:      '100%',
    }

    var fail = ''
    var content = ''

    if (this.props.waiting) {
      content =
      <div style={style}>
        <div style={textStyle}>
          <RefreshIndicator
            size={35}
            left={-50}
            top={27}
            loadingColor={"#FF9800"}
            status="loading"/>
            <h2>processing...</h2>
            <Button
              onClick={() => {
                  if(this.props.onCancel) {
                    this.props.onCancel()
                  }
              }}
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
