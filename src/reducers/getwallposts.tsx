import {
  GET_WALL_POSTS_REQUEST,
  GET_WALL_POSTS_SUCCESS,
  GET_WALL_POSTS_SUCCESS_NEXT,
  GET_WALL_POSTS_FAILURE,
} from "../actions/wall/getWallPosts";

const initialState = {
  isLoading: false,
  isError: false,
  errorCode: "",
  postsdata: [],
};

export interface GetWallTypes {
  isLoading: boolean;
  errorCode: string | number;
  isError: boolean;
  postsdata: any[];
}

export function getWallPostsReducer(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case GET_WALL_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorCode: "",
      };
    case GET_WALL_POSTS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorCode: "",
        postsdata: action.payload,
      };
    case GET_WALL_POSTS_SUCCESS_NEXT:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorCode: "",
        postsdata: [...state.postsdata, ...action.payload],
      };
    case GET_WALL_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorCode: action.payload,
        postsdata: {
          posts: [],
        },
      };
    default:
      return state;
  }
}
