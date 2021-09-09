import { FILESTOUPLOAD } from "../actions/type";

const INITIAL_STATE = {
  fileUpload: null,
};

const fileManagementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILESTOUPLOAD:
      return { ...state, fileUpload: action.payload.fileUpload };
    default:
      return state;
  }
};

export default fileManagementReducer;
