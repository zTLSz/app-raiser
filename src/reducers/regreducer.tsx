import {
  REG_REQUEST,
  REG_SUCCESS,
  REG_FAILURE,
  REG_REDIRECT,
} from "../actions/auth/reg";

const initialState = {
  isReg: false,
  isRegError: false,
  isLoading: false,
  errorCode: "",
};

export function regReducer(
  state = initialState,
  action: { type: string; payload?: object }
) {
  switch (action.type) {
    case REG_REQUEST:
      return {
        ...state,
        isReg: false,
        isRegError: false,
        isLoading: true,
      };
    case REG_SUCCESS:
      return {
        ...state,
        isReg: true,
        isRegError: false,
        isLoading: false,
      };
    case REG_FAILURE:
      return {
        ...state,
        isRegError: true,
        isLoading: false,
        isReg: false,
        errorCode: action.payload,
      };
    case REG_REDIRECT:
      return {
        ...state,
        isReg: false,
        isRegError: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
