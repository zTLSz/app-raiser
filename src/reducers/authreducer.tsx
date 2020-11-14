import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    VERIFY_FAILURE
  } from "../actions/auth";


const initialState = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    user: {},
    counter: 0,
    info: {}
}

    

export function authReducer(state = initialState, action: any) {
    switch(action.type) {
    case LOGIN_REQUEST:
      return {
            ...state,
            isLoggingIn: true,
            loginError: false
        };
    case LOGIN_SUCCESS:
      return {
            ...state,
            isLoggingIn: false,
            isAuthenticated: true,
            isVerifying: false,
            user: action.user
        };
    case LOGIN_FAILURE:
      return {
            ...state,
            isLoggingIn: false,
            isAuthenticated: false,
            loginError: true
        };
    case LOGOUT_REQUEST:
      return {
            ...state,
            isLoggingOut: true,
            logoutError: false
        };
    case LOGOUT_SUCCESS:
      return {
            ...state,
            isLoggingOut: false,
            isAuthenticated: false,
            isVerifying: false,
            user: {},
            counter: 0,
            info: {}
        };
    case LOGOUT_FAILURE:
      return {
            ...state,
            isLoggingOut: false,
            logoutError: true
        };
    case VERIFY_REQUEST:
      return {
            ...state,
            isVerifying: true,
            verifyingError: false
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
            verifyingError: true
        };       

        default:
            return state;
    }

}