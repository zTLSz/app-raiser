import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_FAILURE,
  GET_PROFILE_SUCCESS,
} from "../actions/getProfile";
import { InfoTypes } from "./authreducer";

const initialState = {
  isError: false,
  isLoading: false,
  errorCode: "",
  info: {},
};

export interface ProfileDataTypes {
  isError: boolean;
  isLoading: boolean;
  errorCode: string | number;
  info: InfoTypes;
}

export function getProfileReducer(
  state = initialState,
  action: { type: string; payload?: object; userinfo?: object }
) {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
        info: {},
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
        info: action.userinfo,
      };
    default:
      return state;
  }
}
