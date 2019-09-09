import { combineReducers } from "redux";

const initialState = {
  backdrop: ""
};

export const CHANGE_BACKDROP = "CHANGE_BACKDROP";

export const changeBackdropAction = payload => {
  return {
    type: CHANGE_BACKDROP,
    payload
  };
};

export const backdrop = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_BACKDROP: {
      return {
        ...state,
        backdrop: action.payload
      };
    }
    default:
      return {
        ...state
      };
  }
};

const rootReducer = combineReducers({
  backdrop
});

export default rootReducer;
