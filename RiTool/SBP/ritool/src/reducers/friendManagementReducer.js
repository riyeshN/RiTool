import {
	FETCH_FRIENDS,
	FETCH_SENT_REQUEST,
	FETCH_PENDING_REQUEST,
} from "../actions/type";

const INITIAL_STATE = {
	fetchFriends: null,
	fetchPendingRequests: null,
	fetchSentRequests: null,
};

const FriendManagementReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_FRIENDS:
			return { ...state, fetchFriends: action.payload };
		case FETCH_SENT_REQUEST:
			return { ...state, fetchSentRequests: action.payload };
		case FETCH_PENDING_REQUEST:
			return { ...state, fetchPendingRequests: action.payload };
		default:
			return state;
	}
};

export default FriendManagementReducer;
