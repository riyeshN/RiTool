import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authenticateReducer from "./authenticateReducer";
import fileManagementReducer from "./fileManagementReducer";
import registerReducer from "./registerReducer";
import formInfoReducer from "./formInfoReducer";
import userReducer from "./userReducer";
import FriendManagementReducer from "./friendManagementReducer";

export default combineReducers({
	authenticate: authenticateReducer,
	form: formReducer,
	fileManagement: fileManagementReducer,
	register: registerReducer,
	formInfo: formInfoReducer,
	userInfo: userReducer,
	friendInfo: FriendManagementReducer,
});
