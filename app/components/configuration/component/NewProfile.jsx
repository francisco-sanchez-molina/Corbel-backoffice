import React from "react";
import {Button, Input} from "react-photonkit";

class NewProfile extends React.Component {

	constructor(props) {
		super(props);
		this.corbel = props.corbel;
	}

	onSaveNewProfile() {
		var newProfileName = this.refs.newProfileName.refs.text.value;
		this.corbel.corbelActions.storeNewProfile({profileName: newProfileName});
		this.refs.newProfileName.refs.text.value = '';
	}

	render() {
		return (
			<div>
				<h2>Profile</h2>
				<Input
					label="Add new profile"
					id="profileName"
					placeholder="Profile name"
					ref="newProfileName"/>

				<Button
					onClick={() => this.onSaveNewProfile()}
					class="btn btn-form btn-primary"
					ptStyle="positive"
					glyph="plus"
					text="Save"/>

			</div>
		)
	}

}

export default NewProfile;
