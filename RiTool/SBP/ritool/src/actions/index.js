import { REDIRECT_PAGE, SIGN_IN, SIGN_OUT, REGISTER_USER } from "./type";
import {baseRequest} from "../api/socialApi";
import history from "../history";

export const authSignIn = (userId, token) => {
	return {
		type: SIGN_IN,
		payload: {
			userId: userId,
			token: token,
		},
	};
};

export const SignOut = () => {
	return {
		type: SIGN_OUT,
	};
};

export const SignIn = (formValues) => async (dispatch) => {
	await baseRequest
		.post("auth/", { ...formValues })
		.then((response) => {
			dispatch({
				type: SIGN_IN,
				payload: { token: response.data.token, userId: formValues.username },
			});
		})
		.catch((error) => {
			console.log(error.response);
		});
};

export const registerUser = (formValues) => async (dispatch, getState) => {
	console.log("action - api", dispatch);
	await baseRequest
		.post("socialForm/users/", { ...formValues })
		.then((response) => {
			console.log(response);
			dispatch({ type: REGISTER_USER, payload: response.data });
			history.push("/");
		})
		.catch((error) => {
			console.log(error.response);
		});
};

export const redirectPage = (redirect_Page) => {
	return {
		type: REDIRECT_PAGE,
		payload: {
			redirect_Page: redirect_Page,
		},
	};
};
