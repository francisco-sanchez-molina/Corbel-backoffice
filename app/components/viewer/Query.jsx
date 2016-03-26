import React from "react";

import {Button, Input} from "react-photonkit";


class Query extends React.Component {

  constructor(props) {
    super(props);
  }

  onQueryClick() {
    this.props.dataViewerActions.setQuery({query: this.refs.query.refs.text.value})
  }

  render() {
    return (
      <div>
        <Input
          label="Query"
          id="query"
          placeholder="query"
          ref="query"
          onKeyPress = {(e) => {
            if (e.key === 'Enter') {
              this.onQueryClick()
            }
          }}
          />
      </div>
    )
  }

}

export default Query;
