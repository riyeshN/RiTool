import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./HomePage";
import history from "../history";
import Header from "./Header";
import Climate from "../components/sub-components/climate/Climate";
import Finance from "../components/sub-components/finance/Finance";
import Social from "../components/sub-components/social/Social";
import FormRender from "../components/sub-components/social/FormRender";
import FriendManagement from "../components/sub-components/social/FriendManagement";
import DeleteForm from "../components/sub-components/social/DeleteForm";
import CreateSocialForm from "../components/sub-components/social/CreateSocialForm";
import SignInPage from "./authentication/SignInPage";
import RegisterUser from "./authentication/RegisterUser";
import SocialHeader from "./sub-components/social/SocialHeader";
import SignInUser from "./authentication/SignInUser";
import { CookiesProvider } from "react-cookie";

class App extends React.Component {
	exclude_header = ["/", "/Register", "/SignIn"];

	render() {
		return (
			<div>
				<Router history={history}>
					<CookiesProvider>
						<div>
							<Route
								path="/"
								render={(props) =>
									!this.exclude_header.includes(props.location.pathname) && (
										<Header />
									)
								}
							/>
							<div>
								<Switch>
									<Route path="/" exact component={SignInPage} />
									<Route path="/Register" exact component={RegisterUser} />
									<Route path="/SignIn" exact component={SignInUser} />
									<PrivateRoute path="/HomePage" exact component={HomePage} />
									<PrivateRoute path="/Finance" exact component={Finance} />
									<PrivateRoute path="/Climate" exact component={Climate} />

									<PrivateRoute path="/Social" exact component={Social} />
									<PrivateRoute
										path="/CreateSocialForm"
										exact
										component={CreateSocialForm}
									/>
									<PrivateRoute
										path="/Social/Form/:id"
										exact
										component={FormRender}
									/>
									<PrivateRoute
										path="/Social/Form/DeleteForm/:id"
										exact
										component={DeleteForm}
									/>
									<PrivateRoute
										path="/Social/Friends"
										exact
										component={FriendManagement}
									/>
								</Switch>
							</div>
						</div>
					</CookiesProvider>
				</Router>
			</div>
		);
	}
}

export default App;
