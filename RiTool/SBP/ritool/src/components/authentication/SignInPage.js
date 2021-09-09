import React from "react";
import { connect } from "react-redux";
import { Grid, Header, Form } from "semantic-ui-react";
import Authentication from "./Authentication";
import { Redirect } from "react-router";

class SignInPage extends React.Component {
	render() {
		if (
			this.props.auth.redirect_Page !== null &&
			this.props.auth.isSignedIn === true
		) {
			return <Redirect to={this.props.auth.redirect_Page} />;
		} else if (this.props.auth.isSignedIn === true) {
			return <Redirect to="/HomePage" />;
		}

		return (
			<Grid
				textAlign="center"
				style={{ height: "100vh" }}
				verticalAlign="middle"
			>
				<Grid.Column>
					<Header as="h2" color="blue">
						Please Log-In Below:
					</Header>
					<Form size="small">
						<Authentication from={this.props.auth.redirectPage} />
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.authenticate,
	};
};

export default connect(mapStateToProps)(SignInPage);
