import { FETCH_FORM, FETCH_FORMS, GET_COMMENTS } from "../actions/type";

const INITIAL_STATE = {
	fetchedForms: null,
	fetchedComments: null,
};

const formInfoReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_FORMS:
			return { ...state, fetchedForms: action.payload };
		case FETCH_FORM:
			return { ...state, [action.payload.id]: action.payload };
		case GET_COMMENTS:
			return { ...state, fetchedComments: action.payload };
		default:
			return state;
	}
};

export default formInfoReducer;
