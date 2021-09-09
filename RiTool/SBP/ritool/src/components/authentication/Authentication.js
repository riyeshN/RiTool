import React from "react";
import { connect } from "react-redux";
import { authSignIn, SignOut, SignIn } from "../../actions";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";

class Authentication extends React.Component {
	async componentDidMount() {
		// window.gapi.load("client:auth2", () => {
		// 	window.gapi.client
		// 		.init({
		// 			client_id:
		// 				"1028481781260-pei4l05g9kvlv1d36cuac9uai7ij2par.apps.googleusercontent.com",
		// 			scope: "email",
		// 		})
		// 		.then(() => {
		// 			this.auth = window.gapi.auth2.getAuthInstance();
		// 			this.onAuthChange(this.auth.isSignedIn.get());
		// 			this.auth.isSignedIn.listen(this.onAuthChange);
		// 		});
		// });
		if (this.props.cookies.cookies.usertoken != null) {
			this.onAuthChange(true);
		} else {
			this.onAuthChange(false);
		}
	}

	onAuthChange = (isSignedin) => {
		if (isSignedin) {
			// this.props.socialSignIn(
			// 	this.auth.currentUser.get().getId(),
			// 	this.auth.currentUser.get().getAuthResponse().id_token
			// );
			this.props.authSignIn(
				this.props.cookies.cookies.username,
				this.props.cookies.cookies.usertoken
			);
		} else {
			this.props.SignOut();
		}
	};

	onSocialSignInClick = () => {
		this.auth.signIn();
	};

	onSocialSignOutClick = () => {
		this.auth.signOut();
	};

	onSignOutClick = () => {
		this.props.cookies.remove("usertoken", { path: "/" });
		this.props.cookies.remove("username", { path: "/" });
		console.log(this.props.cookies);
		this.props.SignOut();
	};

	authRender() {
		if (this.props.isSignedIn == null) {
			return <Button basic loading></Button>;
		} else if (this.props.isSignedIn) {
			return (
				<div>
					<Button
						icon="sign out"
						content="Sign Out"
						basic
						circular
						color="grey"
						floated={this.props.placed}
						onClick={() => {
							this.onSignOutClick();
						}}
					/>
				</div>
			);
		} else {
			return (
				<div>
					<Button.Group basic vertical>
						<Button
							content="Google Sign-In"
							basic
							color="teal"
							onClick={() => {
								this.onSocialSignInClick();
							}}
						/>
						<Button
							content="Sign-In"
							basic
							color="teal"
							as={Link}
							to="/SignIn"
						/>
						<Button
							content="Register"
							basic
							color="teal"
							as={Link}
							to="/Register"
						/>
					</Button.Group>
				</div>
			);
		}
	}

	render() {
		return this.authRender();
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.authenticate.isSignedIn,
	};
};

export default withCookies(
	connect(mapStateToProps, { authSignIn, SignOut, SignIn })(Authentication)
);
