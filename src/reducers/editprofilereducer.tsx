import {
  USER_EDIT_REQUEST,
  USER_EDIT_FAILURE,
  USER_EDIT_SUCCESS,
} from "../actions/profile/editProfile";

const initialState = {
  isEdit: false,
  isEditError: false,
  isLoading: false,
  errorCode: "",
};

export interface UserEditTypes {
  isEdit: boolean;
  isEditError: boolean;
  isLoading: boolean;
  errorCode: string | number;
}

export function editProfileReducer(
  state = initialState,
  action: { type: string; payload?: object }
) {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return {
        ...state,
        isEdit: false,
        isEditError: false,
        isLoading: true,
      };
    case USER_EDIT_SUCCESS:
      return {
        ...state,
        isEdit: true,
        isEditError: false,
        isLoading: false,
      };
    case USER_EDIT_FAILURE:
      return {
        ...state,
        isEditError: true,
        isLoading: false,
        isEdit: false,
        errorCode: action.payload,
      };
    default:
      return state;
  }
}
