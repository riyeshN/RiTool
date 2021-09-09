import { FETCH_USER } from "../actions/type";

const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_USER:
			return { ...state, [action.payload.id]: action.payload };
		default:
			return state;
	}
};

export default userReducer;
