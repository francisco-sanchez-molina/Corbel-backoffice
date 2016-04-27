import React from 'react';
import {Window, Button, Pane, Input} from 'react-photonkit';
import Paper from 'material-ui/Paper'

import Waiting from '../waiting/waiting.jsx'

import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/xcode'
require('brace/ext/language_tools');

export default class Evci extends React.Component {

    constructor(props) {
        super(props)
        this.corbel = props.route.corbel
        this.state = {}
        this.state.result = ''
        this.state.editorContent = ''
        this.state.sendEventResult = ''
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        this.corbel.corbelStore.listen(this._onChange);
    }

    componentWillUnmount() {
        this.corbel.corbelStore.unlisten(this._onChange);
    }

    _onChange() {
        this.setState(this.corbel.corbelStore.getState())
    }

    getEditor() {
        this.ace =
            <AceEditor
                readOnly={false}
                height='200px'
                width='80%'
                mode='json'
                theme="xcode"
                name="code"
                ref="code"
                enableLiveAutocompletion={true}
                enableBasicAutocompletion={true}
                onChange={(newValue) => this.updateContent(newValue) }
                value={this.state.editorContent}
                />

        return this.ace
    }

    updateContent(newValue) {
        this.setState({ editorContent: newValue })
    }

    onSend() {
        this.corbel.corbelActions.sendEvent(this.refs.messageType.refs.text.value, this.state.editorContent)
    }
    
    cancelWaiting() {
        this.corbel.corbelActions.cancelSendEvent()
    }

    render() {
        return (
            <Pane className="padded">
                <div style={{
                    padding: '0px 5px 5px 5px',
                    height: '100%'
                }}>
                    <h3>Evci</h3>
                    <Waiting waiting={this.state.sendEventInProgress} onCancel={() => this.cancelWaiting()} />

                    <Paper>
                        <div style={{
                            padding: '0px 5px 5px 5px'
                        }}>
                            <Input
                                label="Evci message type"
                                id="messageType"
                                placeholder="message type"
                                ref="messageType" />
                            Message body:
                            {this.getEditor() }
                            <Button
                                onClick={() => this.onSend() }
                                class="btn btn-form btn-primary"
                                ptStyle="positive"
                                glyph="paper-plane"
                                text="Send"/>
                        </div>
                    </Paper>
                    <Paper>

                        <h4>Result: </h4>
                        {this.state.sendEventResult}
                    </Paper>

                </div>
            </Pane>
        )
    }


}


