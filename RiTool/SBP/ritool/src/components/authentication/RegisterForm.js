import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Checkbox, Label } from "semantic-ui-react";

class RegisterForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return <Label color="red">{error}</Label>;
		}
	}

	renderErr(meta, input) {
		if (meta.error) {
			return <Label color="purple">{meta.error}</Label>;
		}
	}

	renderTextField = ({ input, label, meta }) => {
		//const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<Form.Field>
				<label>{label}</label>
				<input placeholder={label} {...input} autoComplete="off" />
				{this.renderError(meta)}
			</Form.Field>
		);
	};

	renderCheckBox = ({ input, meta, label }) => {
		return (
			<Form.Field>
				<Checkbox
					label={label}
					defaultChecked={false}
					onChange={(e, { checked }) => input.onChange(checked)}
				/>
				{this.renderErr(meta, input)}
			</Form.Field>
		);
	};

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Form.Group widths="equal">
					<Field
						name="first_name"
						component={this.renderTextField}
						label="First Name"
					/>
					<Field
						name="last_name"
						component={this.renderTextField}
						label="Last Name"
					/>
				</Form.Group>
				<Field name="email" component={this.renderTextField} label="Email" />
				<Field
					name="username"
					component={this.renderTextField}
					label="User Name"
				/>
				<Form.Group widths="equal">
					<Field
						name="password"
						component={this.renderTextField}
						label="Password"
					/>
					<Field
						name="confirmPassword"
						component={this.renderTextField}
						label="Confirm Password"
					/>
				</Form.Group>
				<Field
					name="agreement"
					component={this.renderCheckBox}
					label="I agree to the Terms and Conditions"
				/>
				<Button content="Register" basic color="green" size="large" fluid />
			</Form>
		);
	}
}

const validate = (formFields) => {
	const errors = {};

	const requiredFields = [
		"first_name",
		"last_name",
		"email",
		"confirmPassword",
		"password",
		"username",
	];
	requiredFields.forEach((field) => {
		if (!formFields[field]) {
			errors[field] = "Required";
		}
	});
	if (
		formFields.email &&
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formFields.email)
	) {
		errors.email = "Invalid email address";
	}
	if (formFields.password !== formFields.confirmPassword) {
		errors.password = "Password does not match";
		errors.confirmPassword = "Password does not match";
	}
	if (formFields.agreement === null) {
		errors.agreement = "required";
	}
	if (!formFields.agreement) {
		errors.agreement = "You have to accept the terms of agreement";
	}

	return errors;
};

export default reduxForm({ form: "registerForm", validate })(RegisterForm);
