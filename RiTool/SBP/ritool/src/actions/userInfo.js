import { FETCH_USER } from "./type";
import { baseRequest } from "../api/socialApi";

export const fetchUser = (token, id) => async (dispatch) => {
	const headers = {
		Authorization: `Token ${token}`,
	};
	await baseRequest
		.get(`socialForm/users/${id}/`, { headers })
		.then((response) => {
			dispatch({
				type: FETCH_USER,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log("Error", error.response);
		});
};
