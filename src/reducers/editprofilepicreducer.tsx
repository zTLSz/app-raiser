import {
  USER_PIC_EDIT_REQUEST,
  USER_PIC_EDIT_FAILURE,
  USER_PIC_EDIT_SUCCESS,
} from "../actions/profile/editUserPic";

const initialState = {
  isEdit: false,
  isEditError: false,
  isLoading: false,
  errorCode: "",
};

export interface PicEditTypes {
  isEdit: boolean;
  isEditError: boolean;
  isLoading: boolean;
  errorCode: string | number;
}

export function editProfilePicReducer(
  state = initialState,
  action: { type: string; payload?: object }
) {
  switch (action.type) {
    case USER_PIC_EDIT_REQUEST:
      return {
        ...state,
        isEdit: false,
        isEditError: false,
        isLoading: true,
      };
    case USER_PIC_EDIT_SUCCESS:
      return {
        ...state,
        isEdit: true,
        isEditError: false,
        isLoading: false,
      };
    case USER_PIC_EDIT_FAILURE:
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
