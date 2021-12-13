import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
} from "../actions/auth";

import { USER_EDIT_SUCCESS } from "../actions/editProfile";
import { USER_PIC_EDIT_SUCCESS } from "../actions/editUserPic";

export interface AuthTypes {
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isVerifying: boolean;
  loginError: boolean;
  logoutError: boolean;
  isAuthenticated: boolean;
  user: any;
  counter: number;
  info: InfoTypes;
}

export interface InfoTypes {
  about: string;
  age: number;
  avatar: null | string;
  color: string;
  email: string;
  followers: number;
  following: number;
  isAdmin: boolean;
  nickname: string;
  regdate: any;
}

const initialState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  loginError: false,
  logoutError: false,
  isAuthenticated: false,
  user: {},
  counter: 0,
  info: {},
};

export function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        isVerifying: false,
        user: action.user,
        counter: action.usercounter,
        info: action.userinfo,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        isVerifying: false,
        user: {},
        counter: 0,
        info: {},
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true,
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false,
      };
    case VERIFY_FAILURE:
      return {
        ...state,
        isVerifying: false,
        verifyingError: true,
      };
    case USER_EDIT_SUCCESS:
      return {
        ...state,
        info: action.userinfo,
      };
    case USER_PIC_EDIT_SUCCESS:
      return {
        ...state,
        info: action.userinfo,
      };

    default:
      return state;
  }
}
