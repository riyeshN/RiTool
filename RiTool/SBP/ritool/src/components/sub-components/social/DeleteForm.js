import React from "react";
import history from "../../../history";
import Modal from "../../Modal";
import { Button, Header } from "semantic-ui-react";
import { withCookies } from "react-cookie";
import { deleteForm } from "../../../actions/form";

class DeleteForm extends React.Component {
	renderDeleteContent() {
		return (
			<div>
				<Header textAlign="center" block as="h3" color="red">
					Are you sure that you want to delete this?
				</Header>
				<Button.Group fluid>
					<Button
						basic
						color="red"
						content="Delete"
						onClick={async() => {
							await deleteForm(
								this.props.cookies.cookies.usertoken,
								this.props.match.params.id
							);
							history.push("/Social");
						}}
					/>
					<Button
						basic
						color="blue"
						content="Dismiss"
						onClick={() => {
							history.goBack();
						}}
					/>
				</Button.Group>
			</div>
		);
	}

	renderDeleteAction() {
		return;
	}

	renderDeletePrompt = () => {
		console.log("test");
		return (
			<Modal
				onClickClose={false}
				icon="delete"
				title="Delete"
				content={this.renderDeleteContent()}
				actions={this.renderDeleteAction()}
				onDismiss={() => history.goBack()}
			/>
		);
	};

	render() {
		return this.renderDeletePrompt();
	}
}
export default withCookies(DeleteForm);
