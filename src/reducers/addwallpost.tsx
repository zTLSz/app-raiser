import {
  ADD_WALL_POST_REQUEST,
  ADD_WALL_POST_SUCCESS,
  ADD_WALL_POST_FAILURE,
} from "../actions/addwallpost";

const initialState = {
  isLoading: false,
  isError: false,
  errorCode: "",
};

export interface AddWallTypes {
  isLoading: boolean;
  isError: boolean;
  errorCode: string | number;
}

export function addWallPostReducer(
  state = initialState,
  action: { type: string; payload?: object }
) {
  switch (action.type) {
    case ADD_WALL_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorCode: "",
      };
    case ADD_WALL_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorCode: "",
      };
    case ADD_WALL_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorCode: action.payload,
      };
    default:
      return state;
  }
}
