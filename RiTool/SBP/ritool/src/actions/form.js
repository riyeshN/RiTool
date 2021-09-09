import { SUBMIT_FORM, FETCH_FORM, FETCH_FORMS, GET_COMMENTS } from "./type";
import axios from "axios";
import { baseUrl, baseRequest } from "../api/socialApi";
import history from "../history";

export const formSubmit = (fileupload, token) => async (dispatch) => {
	const headers = {
		Authorization: `Token ${token}`,
	};
	await axios({
		method: "post",
		url: `${baseUrl}socialForm/forms/`,
		data: fileupload,
		headers,
	})
		.then((response) => {
			dispatch({
				type: SUBMIT_FORM,
				payload: response.data,
			});
			history.push("/Social");
		})
		.catch((error) => {
			console.log("Error", error.response);
			alert("Please make sure that you have submitted your form correctly");
		});
};

export const fetchForms = (token) => async (dispatch) => {
	const headers = {
		Authorization: `Token ${token}`,
	};
	await baseRequest
		.get("socialForm/formget/", { headers })
		.then((response) => {
			dispatch({
				type: FETCH_FORMS,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log("Error", error.response);
		});
};

export const fetchForm = (token, id) => async (dispatch) => {
	const headers = {
		Authorization: `Token ${token}`,
	};
	await baseRequest
		.get(`socialForm/formget/${id}/`, { headers })
		.then((response) => {
			dispatch({
				type: FETCH_FORM,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log("Error", error.response);
		});
};

export const fetchFile = async (token, path, filename) => {
	const headers = {
		Authorization: `Token ${token}`,
	};

	await axios({
		method: "post",
		url: `${baseUrl}socialForm/forms/get_file/`,
		data: { filepath: path, filename: filename },
		headers,
	})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log("Error", error.response);
		});
};

export const deleteForm = async (token, id) => {
	const headers = {
		Authorization: `Token ${token}`,
	};

	await baseRequest
		.delete(`/socialForm/forms/${id}/`, { headers })
		.then((response) => {
			console.log("here it is:", id, response);
		})
		.catch((error) => {
			console.log("Error", error.response);
		});
};

export const postComments = async (token, formid, body_content) => {
	const headers = {
		Authorization: `Token ${token}`,
	};
	await axios({
		method: "POST",
		url: `${baseUrl}socialForm/comments/`,
		data: {
			body_content: body_content,
			form: formid,
		},
		headers,
	})
		.then((response) => {
			console.log(response);
			history.go(`/Social/Form/${formid}`);
		})
		.catch((error) => console.log("error:", error.response));
};

export const getComments = (token, formid) => async (dispatch) => {
	const headers = {
		Authorization: `Token ${token}`,
	};

	await axios({
		methond: "GET",
		url: `${baseUrl}socialForm/comments_get/`,
		data: {
			form: formid,
		},
		headers,
	})
		.then((response) => {
			dispatch({
				type: GET_COMMENTS,
				payload: response.data,
			});
			history.push(`/Social/Form/${formid}`);
		})
		.catch((error) => console.log("error:", error.response));
};

export const deleteComment = async (token, commentId) => {
	const headers = {
		Authorization: `Token ${token}`,
	};

	await baseRequest
		.delete(`/socialForm/comments/${commentId}/`, { headers })
		.then((response) => {
			console.log("here it is:", commentId, response);
			history.go(0);
		})
		.catch((error) => {
			console.log("Error", error.response);
		});
};
