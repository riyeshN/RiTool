import { REGISTER_USER } from "../actions/type";

const registerReducer = (state = {}, action) => {
	switch (action.type) {
		case REGISTER_USER:
			return { ...state, [action.payload.id]: action.payload };
		default:
			return state;
	}
};

export default registerReducer;
