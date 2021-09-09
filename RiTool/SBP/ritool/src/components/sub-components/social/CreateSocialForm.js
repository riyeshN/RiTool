import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { filesToUpload } from "../../../actions/fileManagement";
import { withCookies } from "react-cookie";
// import DropZoneField from "../../misc/dropZone";
import { formSubmit } from "../../../actions/form";
import SocialHeader from "./SocialHeader";
import { Form, Grid, Message, Segment, Tab, Button } from "semantic-ui-react";

class CreateSocialForm extends React.Component {
	renderInput(formProps) {
		return (
			<Form.Field
				control={formProps.fieldtype}
				label={formProps.label}
				placeholder={formProps.placeholder}
				{...formProps.input}
			/>
		);
	}

	onSubmit = async (formValues) => {
		const fileupload = new FormData();
		if (this.props.fileUpload) {
			Array.from(this.props.fileUpload).forEach((file) => {
				fileupload.append("files", file);
			});
		}
		if (
			formValues.summary === undefined ||
			formValues.title === undefined ||
			formValues.details === undefined
		) {
			alert("PLease enter the summary, details and title");
		} else {
			fileupload.append("summary", formValues.summary);
			fileupload.append("title", formValues.title);
			fileupload.append("details", formValues.details);

			this.props.formSubmit(fileupload, this.props.cookies.cookies.usertoken);
		}
	};

	renderval = () => {
		if (this.props.fileUpload) {
			return <div>{this.props.fileUpload[0].name}</div>;
		} else {
			return <div>None Selected</div>;
		}
	};

	render() {
		const panes = [
			{
				menuItem: "Content",
				render: () => (
					<Tab.Pane attached={false}>
						<Message>Add Basic Information</Message>
						<Field
							name="title"
							id="form-input-title"
							label="Title"
							fieldtype="input"
							placeholder="Enter Title"
							component={this.renderInput}
						/>
						<Field
							name="summary"
							id="form-input-summary"
							fieldtype="input"
							placeholder="Enter Summary"
							component={this.renderInput}
						/>
						<Field
							name="details"
							id="form-detail-title"
							label="Details"
							fieldtype="textarea"
							placeholder="Enter Details"
							component={this.renderInput}
						/>
						<Button content="Create" basic color="green" />
					</Tab.Pane>
				),
			},
			{
				menuItem: "Attachments",
				render: () => (
					<Tab.Pane attached={false}>
						<Message>Add Attachments</Message>
						{/* <Field
							name="filesToUpload"
							id="form-input-files"
							fieldtype="attachments"
							type="file"
							handleOnDrop={this.handleOnDrop}
							component={DropZoneField}
						/> */}
						<input
							type="file"
							multiple
							onChange={(e) => this.props.filesToUpload(e.target.files)}
						/>
						<Button content="Create" basic color="green" />
						{this.renderval()}
					</Tab.Pane>
				),
			},
		];

		return (
			<div>
				<SocialHeader />
				<Grid.Row style={{ height: "5vh" }} />
				<Grid
					relaxed
					divided
					textAlign="center"
					style={{ height: "50vh" }}
					verticalAlign="middle"
				>
					<Grid.Row>
						<Grid.Column width={9}>
							<Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
								<Tab menu={{ pointing: true, color: "teal" }} panes={panes} />
							</Form>
						</Grid.Column>
						<Grid.Column width={3}>
							<Segment floated="right">1</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		fileUpload: state.fileManagement.fileUpload,
	};
};

const formWrapped = reduxForm({
	form: "formCreate",
})(CreateSocialForm);

export default withCookies(
	connect(mapStateToProps, { filesToUpload, formSubmit })(formWrapped)
);
