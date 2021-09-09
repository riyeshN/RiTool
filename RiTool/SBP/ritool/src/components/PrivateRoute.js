import React, { useEffect } from "react";
import { Route } from "react-router";
import { connect } from "react-redux";
import { redirectPage } from "../actions";
import { Dimmer, Loader } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isSignedIn, ...rest }) => {
	useEffect(() => {
		rest.redirectPage(window.location.pathname);
	}, []);// eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Route
			{...rest}
			render={(props) => {
				if (isSignedIn === null) {
					return (
						<div>
							<Dimmer active inverted>
								<Loader size="huge">Loading</Loader>
							</Dimmer>
						</div>
					);
				} else if (!isSignedIn) {
					//rest.redirectPage(window.location.pathname);
					return <Redirect to="/" />;
				} else {
					return <Component {...props} />;
				}
			}}
		/>
	);
};

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.authenticate.isSignedIn,
		redirect_Page: state.authenticate.redirect_Page,
	};
};

export default connect(mapStateToProps, { redirectPage })(PrivateRoute);
