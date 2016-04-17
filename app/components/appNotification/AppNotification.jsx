import React from 'react'

import Snackbar from 'material-ui/lib/snackbar'

import AppNotificationActions from '../../actions/AppNotificationActions'

class AppNotification extends React.Component {

  constructor(props) {
    super(props)
    this.corbel = props.corbel
    this.state = this.corbel.appNotificationStore.getState()
    this.setState = this.setState.bind(this)
  }

  componentDidMount() {
    this.corbel.appNotificationStore.listen(this.setState)
  }

  componentWillUnmount() {
    this.corbel.appNotificationStore.unlisten(this.setState)
  }

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.newNotification}
          message={this.state.notification.text}
          autoHideDuration={4000}
          onRequestClose={AppNotificationActions.closeNotification}
        />
      </div>
    )
  }

}

export default AppNotification;
