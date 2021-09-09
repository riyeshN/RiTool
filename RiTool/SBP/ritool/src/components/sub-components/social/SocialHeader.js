import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import history from "../../../history";

const SocialHeader = () => {
	return (
		<div>
			<Grid textAlign="center">
				<Grid.Row>
					<Grid.Column width={9}>
						<Button.Group compact widths={4} size="tiny">
							<Button
								basic
								color="teal"
								as={Link}
								to="/Social"
								content="Social Home"
							/>
							<Button
								basic
								color="blue"
								as={Link}
								to="/Social/Friends"
								content="Friend Management"
							/>
							<Button
								basic
								color="teal"
								as={Link}
								to="/CreateSocialForm"
								content="Create Form"
							/>
							<Button basic color="blue" content="Group" />
						</Button.Group>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<span />
		</div>
	);
};

export default SocialHeader;
