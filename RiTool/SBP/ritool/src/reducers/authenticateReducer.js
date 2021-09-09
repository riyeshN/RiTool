import { SIGN_IN, SIGN_OUT, REDIRECT_PAGE } from "../actions/type";

const INITIAL_STATE = {
	userId: null,
	isSignedIn: null,
	redirect_Page: null,
	token: null,
};

const authenticateReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				isSignedIn: true,
				token: action.payload.token,
				userId: action.payload.userId,
			};
		case SIGN_OUT:
			return { ...state, isSignedIn: false, userId: null };
		case REDIRECT_PAGE:
			return { ...state, redirect_Page: action.payload.redirect_Page };
		default:
			return state;
	}
};

export default authenticateReducer;
