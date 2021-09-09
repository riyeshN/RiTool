import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";
import history from "../history";
import Authentication from "./authentication/Authentication";

const Header = () => {
	return (
		<div>
			<Menu secondary>
				<Dropdown item icon="bars">
					<Dropdown.Menu>
						<Dropdown.Item>
							<Link to="/HomePage">Home</Link>
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() => {
								history.push("/Climate");
							}}
						>
							Climate
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() => {
								history.push("/Finance");
							}}
						>
							Finance
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() => {
								history.push("/Social");
							}}
						>
							Social
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<Menu.Menu position="right">
					<Authentication placed="right" />
				</Menu.Menu>
			</Menu>
		</div>
	);
};

export default Header;
