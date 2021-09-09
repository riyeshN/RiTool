import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
	Button,
	Grid,
	Card,
	Segment,
	Icon,
	Header,
	Form,
} from "semantic-ui-react";
import { fetchForms } from "../../../actions/form";
import { withCookies } from "react-cookie";
import SocialHeader from "./SocialHeader";

class Social extends React.Component {
	state = {
		filterUser: "",
		filterTitle: "",
	};

	componentDidMount() {
		this.props.fetchForms(this.props.cookies.cookies.usertoken);
	}

	onFilterinput = (event) => {
		this.setState({ [event.target.id]: event.target.value });
	};

	onFormSubmit = (event) => {
		event.preventDefault();
	};

	renderFilterForm = () => {
		return (
			<div>
				<Form onSubmit={this.onFormSubmit}>
					<Form.Input
						fluid
						placeholder="username"
						id="filterUser"
						value={this.state.user}
						onChange={this.onFilterinput}
					/>
					<Form.Input
						fluid
						placeholder="title"
						value={this.state.title}
						id="filterTitle"
						onChange={this.onFilterinput}
					/>

					<Button basic color="blue" type="submit">
						Filter
					</Button>
				</Form>
			</div>
		);
	};

	renderFormIcon() {
		let icons = [];
		if (this.props.formFetch) {
			this.props.formFetch.forEach((element) => {
				const date = new Date(element.created_at);
				if (
					element.user.username
						.toLowerCase()
						.includes(this.state.filterUser.toLowerCase()) &&
					element.title
						.toLowerCase()
						.includes(this.state.filterTitle.toLowerCase())
				) {
					icons.push(
						<Card
							key={element.title}
							style={{ overflow: "auto", maxHeight: "80vh" }}
							link
							as={Link}
							to={`/Social/Form/${element.id}`}
						>
							<Card.Content>
								<Header as="h2" icon textAlign="center">
									<Icon name="users" circular />
									<Header.Content>{element.title}</Header.Content>
								</Header>
								<Card.Meta>{`Author: ${element.user["username"]}`}</Card.Meta>
								<Card.Meta>{`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`}</Card.Meta>
								<Card.Description>{element.summary}</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<div>
									<Icon name="comments" />
									{element.no_of_comments}
									<Icon name="heartbeat" />
									{element.likedislikeratio}
								</div>
							</Card.Content>
						</Card>
					);
				}
			});
		}
		return icons;
	}

	render() {
		return (
			<div>
				<SocialHeader />
				<Grid textAlign="center">
					<Grid.Row>
						<Grid.Column width="3">
							<Segment color="teal" basic>
								<Header as="h4" color="blue">
									Filter For
								</Header>
								{this.renderFilterForm()}
							</Segment>
						</Grid.Column>
						<Grid.Column width="10">
							<Segment basic>
								<Segment
									inverted
									color="blue"
									style={{ overflow: "auto", maxHeight: "80vh" }}
								>
									<Card.Group itemsPerRow={4}>
										{this.renderFormIcon()}
									</Card.Group>
								</Segment>
							</Segment>
						</Grid.Column>
						<Grid.Column width="3">
							<Segment basic></Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.authenticate.isSignedIn,
		formFetch: state.formInfo.fetchedForms,
	};
};

export default withCookies(connect(mapStateToProps, { fetchForms })(Social));
