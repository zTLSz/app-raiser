import {
  SET_POST_LIKE_REQUEST,
  SET_POST_LIKE_SUCCESS,
  SET_POST_LIKE_FAILURE,
} from "../actions/postlikes/setPostLike";

import {
  REMOVE_POST_LIKE_REQUEST,
  REMOVE_POST_LIKE_SUCCESS,
  REMOVE_POST_LIKE_FAILURE,
} from "../actions/postlikes/deletePostLike";

const initialState = {
  isError: false,
  isLoading: false,
  errorCode: "",
};

export interface PicEditTypes {
  isError: boolean;
  isLoading: boolean;
  errorCode: string | number;
}

export function setPostLikeReducer(
  state = initialState,
  action: { type: string; payload?: object }
) {
  switch (action.type) {
    case SET_POST_LIKE_REQUEST:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case SET_POST_LIKE_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
      };
    case SET_POST_LIKE_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
        errorCode: action.payload,
      };
    case REMOVE_POST_LIKE_REQUEST:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case REMOVE_POST_LIKE_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
      };
    case REMOVE_POST_LIKE_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
        errorCode: action.payload,
      };
    default:
      return state;
  }
}
