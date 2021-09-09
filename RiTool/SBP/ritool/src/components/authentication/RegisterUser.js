import React from "react";
import Modal from "../Modal";
import { connect } from "react-redux";
import history from "../../history";
import { registerUser } from "../../actions/index";
import RegisterForm from "./RegisterForm";
import { withCookies } from "react-cookie";

class RegisterUser extends React.Component {
	componentDidMount() {
		if (
			this.props.auth.isSignedIn === true ||
			this.props.cookies.cookies.usertoken
		) {
			history.push("/HomePage");
		}
	}

	renderActions() {
		return;
	}

	onSubmit = (formValue) => {
		this.props.registerUser(formValue);
	};

	renderContent() {
		return <RegisterForm onSubmit={this.onSubmit} />;
	}

	render() {
		return (
			<Modal
				onClickClose={true}
				icon="signup"
				title="Register"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push("/")}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	console.log("reg state:", state);
	return {
		auth: state.authenticate,
	};
};

export default withCookies(
	connect(mapStateToProps, { registerUser })(RegisterUser)
);
