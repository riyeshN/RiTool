import React from "react";
import DropZone from "react-dropzone";
import { Form } from "semantic-ui-react";
import { Icon, Segment } from "semantic-ui-react";

const DropZoneField = (props) => {
	return (
		<Form.Field>
			<DropZone
				onDrop={props.handleOnDrop}
				onChange={(files) => props.input.onChange(files)}
			>
				{({ getRootProps, getInputProps, isDragActive, isDragReject }) => 
					
					(
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<Segment padded="very">
								<Icon name="cloud upload" />
								{isDragActive
									? "Drop it like it's hot!"
									: "Click me or drag a file to upload!"}
							</Segment>
						</div>
					)}
			</DropZone>
		</Form.Field>
	);
};

export default DropZoneField;
