import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Label, Button } from "semantic-ui-react";

class SignInForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return <Label color="red">{error}</Label>;
		}
	}

	renderTextField = ({ input, label, meta, type }) => {
		//const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<Form.Field>
				<label>{label}</label>
				<input placeholder={label} {...input} autoComplete="off" type={type} />
				{this.renderError(meta)}
			</Form.Field>
		);
	};

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field
					component={this.renderTextField}
					name="username"
					label="User Name"
					type="text"
				/>
				<Field
					component={this.renderTextField}
					name="password"
					label="Password"
					type="password"
				/>
				<Button content="Sign-In" basic color="green" size="large" fluid />
			</Form>
		);
	}
}

const validate = (formFields) => {
	const errors = {};
	const requiredFields = ["password", "username"];
	requiredFields.forEach((field) => {
		if (!formFields[field]) {
			errors[field] = "Required";
		}
	});
};

export default reduxForm({ form: "signInForm" }, validate)(SignInForm);
