import React from "react";
import {
	Tab,
	Header,
	Icon,
	List,
	Dimmer,
	Loader,
	Segment,
	Grid,
	Button,
	Form,
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import {
	fetchFriends,
	fetchSentRequests,
	fetchPendingRequests,
	sendFriendRequest,
	acceptFriendRequest,
} from "../../../actions/friendManagement";
import SocialHeader from "./SocialHeader";

class FriendManagement extends React.Component {
	componentDidMount() {
		this.props.fetchFriends(this.props.cookies.cookies.usertoken);
		this.props.fetchPendingRequests(this.props.cookies.cookies.usertoken);
		this.props.fetchSentRequests(this.props.cookies.cookies.usertoken);
	}

	state = {
		color: "teal",
	};

	handleTabChange = (e, data) => {
		if (data.activeIndex === 0) {
			this.setState({ color: "teal" });
		} else if (data.activeIndex === 1) {
			this.setState({ color: "blue" });
		} else {
			this.setState({ color: "green" });
		}
	};

	renderFriends = () => {
		const friends = [];
		if (this.props.friendsInfo.fetchFriends) {
			this.props.friendsInfo.fetchFriends.forEach((e) => {
				friends.push(
					<List.Item>
						<List.Content floated="right">
							<Button basic color="red" circular>
								Remove
							</Button>
						</List.Content>
						<List.Content>
							<List.Header>{e.user}</List.Header>
							<List.Description>User Description added here</List.Description>
						</List.Content>
					</List.Item>
				);
			});
			return friends;
		} else {
			return (
				<Dimmer active inverted>
					<Loader>Loading</Loader>
				</Dimmer>
			);
		}
	};

	renderFriendList = () => {
		return (
			<Grid>
				<Grid.Row>
					<Grid.Column width={8}>
						<Segment
							color="blue"
							style={{ overflow: "auto", maxHeight: "80vh" }}
						>
							<Header as="h4" icon>
								<Icon name="user" />
								Friends List
								<Header.Subheader>
									List of users who are inside your bubble!
								</Header.Subheader>
							</Header>
							<List selection verticalAlign="middle">
								{this.renderFriends()}
							</List>
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	};

	onClickRequest = (e, status) => {
		console.log("btn", e, status);
		acceptFriendRequest(this.props.cookies.cookies.usertoken, e.id, status);
	};

	renderPendingList = () => {
		const friends = [];
		if (this.props.friendsInfo.fetchPendingRequests) {
			this.props.friendsInfo.fetchPendingRequests.forEach((e) => {
				friends.push(
					<List.Item key={e.user}>
						<List.Content floated="right">
							<Button
								basic
								color="red"
								circular
								onClick={() => this.onClickRequest(e, false)}
							>
								Decline
							</Button>
							<Button
								basic
								color="green"
								circular
								onClick={() => this.onClickRequest(e, true)}
							>
								Accept
							</Button>
						</List.Content>
						<List.Content>
							<List.Header>{e.user}</List.Header>
							<List.Description>{`Message: ${e.message}`}</List.Description>
							<List.Description>{`Sent: ${e.created}`}</List.Description>
						</List.Content>
					</List.Item>
				);
			});
			return friends;
		} else {
			return <div>No List Found</div>;
		}
	};

	renderPendingRequest = () => {
		return (
			<List selection divided verticalAlign="middle">
				{this.renderPendingList()}
			</List>
		);
	};

	renderSentList = () => {
		const friends = [];
		if (this.props.friendsInfo.fetchSentRequests) {
			this.props.friendsInfo.fetchSentRequests.forEach((e) => {
				friends.push(
					<List.Item key={e.user}>
						<List.Content>
							<List.Header>{e.user}</List.Header>
							<List.Description>{`Sent: ${e.created}`}</List.Description>
						</List.Content>
					</List.Item>
				);
			});
			return friends;
		} else {
			return <div>No List Found</div>;
		}
	};

	renderSentRequest = () => {
		return (
			<List selection divided verticalAlign="middle">
				{this.renderSentList()}
			</List>
		);
	};

	onRequestSubmit = (formValues) => {
		console.log(formValues);
		this.props.sendFriendRequest(
			this.props.cookies.cookies.usertoken,
			formValues
		);
	};

	renderTextField = ({ input, meta, label, type }) => {
		return (
			<Form.Field>
				<label>{label}</label>
				<input placeholder={label} {...input} autoComplete="off" type={type} />
				{/* {this.renderError(meta)} */}
			</Form.Field>
		);
	};

	renderSendRequestInput = () => {
		return (
			<Form onSubmit={this.props.handleSubmit(this.onRequestSubmit)}>
				<Field
					component={this.renderTextField}
					name="other_user"
					label="User"
					type="text"
				/>
				<Field
					component={this.renderTextField}
					name="message"
					label="Message"
					type="text"
				/>
				<Button
					floated="right"
					size="mini"
					content="Add Friend"
					basic
					color="green"
				/>
			</Form>
		);
	};

	renderRequestStatus = () => {
		return (
			<div>
				<Grid>
					<Grid.Row stretched>
						<Grid.Column width={10}>
							<Segment
								color="green"
								style={{ overflow: "auto", maxHeight: "80vh" }}
							>
								<Header as="h4" color="teal" textAlign="center">
									Received Requests
								</Header>
								{this.renderPendingRequest()}
							</Segment>
							<Segment
								color="green"
								style={{ overflow: "auto", maxHeight: "80vh" }}
							>
								<Header as="h4" color="teal" textAlign="center">
									Pending Requests
								</Header>
								{this.renderSentRequest()}
							</Segment>
						</Grid.Column>
						<Grid.Column width={6}>
							<Segment color="teal">
								<Header as="h4" color="green" textAlign="center">
									Add Friend
								</Header>
								{this.renderSendRequestInput()}
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	};

	render() {
		const panes = [
			{
				menuItem: "Friend List",
				render: () => (
					<Tab.Pane color={this.state.color}>
						{this.renderFriendList()}
					</Tab.Pane>
				),
			},
			{
				menuItem: "Requests",
				render: () => (
					<Tab.Pane color={this.state.color}>
						{this.renderRequestStatus()}
					</Tab.Pane>
				),
			},
		];
		return (
			<div>
				<SocialHeader />
				<div className="ui container">
					<Grid.Row style={{ height: "3vh" }} />
					<Header as="h2" icon textAlign="center">
						<Icon name="users" circular />
						<Header.Content>Limitations of one's Bubble!</Header.Content>
					</Header>
					<span />
					<Tab
						onTabChange={this.handleTabChange}
						menu={{
							color: this.state.color,
							fluid: true,
							vertical: true,
							tabular: true,
						}}
						panes={panes}
					/>
				</div>
			</div>
		);
	}
}

const MapStatetoProps = (state) => {
	return {
		isSignedIn: state.authenticate.isSignedIn,
		loggedInUserName: state.authenticate.userId,
		friendsInfo: state.friendInfo,
		userInfo: state.userInfo,
	};
};

const formWrapped = reduxForm({
	form: "userAdded",
})(FriendManagement);

export default withCookies(
	connect(MapStatetoProps, {
		fetchFriends,
		fetchPendingRequests,
		fetchSentRequests,
		sendFriendRequest,
		acceptFriendRequest,
	})(formWrapped)
);
