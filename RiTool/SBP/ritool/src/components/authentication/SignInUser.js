import React from "react";
import { connect } from "react-redux";
import history from "../../history";
import { SignIn } from "../../actions/index";
import SignInForm from "./SignInForm";
import Modal from "../Modal";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class SignInUser extends React.Component {
	componentDidMount() {
		if (
			this.props.auth.isSignedIn === true ||
			this.props.cookies.cookies.usertoken
		) {
			history.push("/HomePage");
		}
	}

	static propTypes = {
		cookies: instanceOf(Cookies).isRequired,
	};

	renderActions() {
		return;
	}

	onSubmit = async (formValues) => {
		await this.props.SignIn(formValues);
		if (this.props.auth.isSignedIn) {
			const token = this.props.auth.token;
			const username = this.props.auth.userId;
			this.props.cookies.set("usertoken", token, { path: "/" });
			this.props.cookies.set("username", username, { path: "/" });
			this.onRedirect();
		} else {
			alert("Please enter valid credentials");
		}
	};

	onRedirect = () => {
		if (
			this.props.auth.redirect_Page !== null &&
			this.props.auth.isSignedIn === true
		) {
			history.push(this.props.auth.redirect_Page);
		} else if (this.props.auth.isSignedIn === true) {
			history.push("/HomePage");
		}
	};

	renderContent() {
		return <SignInForm onSubmit={this.onSubmit} />;
	}

	render() {
		return (
			<Modal
				onClickClose={true}
				icon="sign-in"
				title="SignIn"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push("/")}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.authenticate,
	};
};

export default withCookies(connect(mapStateToProps, { SignIn })(SignInUser));
