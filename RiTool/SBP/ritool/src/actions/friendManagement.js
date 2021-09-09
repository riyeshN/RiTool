import axios from "axios";
import history from "../history";
import {
	FETCH_FRIENDS,
	FETCH_PENDING_REQUEST,
	FETCH_SENT_REQUEST,
	SEND_FRIEND_REQUEST,
} from "./type";
import { baseUrl, baseRequest } from "../api/socialApi";

export const fetchFriends = (token) => async (dispatch) => {
	const headers = {
		Authorization: `Token ${token}`,
	};

	baseRequest
		.get("socialForm/friendship/get_friends/", { headers })
		.then((request) => {
			dispatch({
				type: FETCH_FRIENDS,
				payload: request.data,
			});
		})
		.catch((error) => {
			console.log("Error", error.response);
		});
};

export const fetchPendingRequests = (token) => async (dispatch) => {
	const headers = {
		Authorization: `Token ${token}`,
	};

	baseRequest
		.get("socialForm/friendship/get_pending_requests/", { headers })
		.then((request) => {
			dispatch({
				type: FETCH_PENDING_REQUEST,
				payload: request.data,
			});
		})
		.catch((error) => {
			console.log("Error", error.response);
		});
};

export const fetchSentRequests = (token) => async (dispatch) => {
	const headers = {
		Authorization: `Token ${token}`,
	};

	baseRequest
		.get("socialForm/friendship/get_sent_requests/", { headers })
		.then((request) => {
			dispatch({
				type: FETCH_SENT_REQUEST,
				payload: request.data,
			});
		})
		.catch((error) => {
			console.log("Error", error.response);
		});
};

export const sendFriendRequest = (token, formValues) => async (dispatch) => {
	const headers = {
		Authorization: `Token ${token}`,
	};

	await axios({
		method: "POST",
		url: `${baseUrl}socialForm/friendship/send_request/`,
		data: formValues,
		headers: headers,
	})
		.then((response) => {
			dispatch({
				type: SEND_FRIEND_REQUEST,
				payload: response.data,
			});
			history.go(0);
		})
		.catch((error) => {
			alert("User Not Found");
			console.log("Error", error.response);
		});
};

export const acceptFriendRequest = async (token, to_user, response_type) => {
	const headers = {
		Authorization: `Token ${token}`,
	};
	await axios({
		method: "POST",
		url: `${baseUrl}socialForm/friendship/accept_request/`,
		data: {
			to_user: to_user,
			response: response_type,
		},
		headers: headers,
	})
		.then((response) => {
			console.log('added', response);
			console.log("successful");
			history.go(0);
		})
		.catch((error) => {
			alert("There was an issue");
			console.log("Error", error.response);
		});
};
