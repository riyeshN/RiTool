import React from "react";
import ReactDom from "react-dom";
import { Header, Button } from "semantic-ui-react";

const Modal = (props) => {
	const rendertitle = () => {
		return (
			<Header
				as="h2"
				content={props.title}
				icon={props.icon}
				textAlign="center"
			/>
		);
	};

	const renderCloseButton = () => {
		if (props.onClickClose) {
			return (
				<Button
					icon="close"
					onClick={props.onDismiss}
					color="red"
					floated="right"
				/>
			);
		}
	};

	const boxClickHandle = () => {
		if (!props.onClickClose) {
			return props.onDismiss;
		}
	};

	return ReactDom.createPortal(
		<div className="ui dimmer modals visible active" onClick={boxClickHandle()}>
			<div
				className="ui standard modal visible active"
				onClick={(e) => e.stopPropagation()}
			>
				{renderCloseButton()}
				<div className="header">{rendertitle()}</div>
				<div className="content">{props.content}</div>
			</div>
		</div>,
		document.querySelector("#modal")
	);
};

export default Modal;
