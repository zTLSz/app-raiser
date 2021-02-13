import {
    SUBSCRIBE_USER_REQUEST,
    SUBSCRIBE_USER_SUCCESS,
    SUBSCRIBE_USER_FAILURE,
  } from '../actions/subscribe/subscribeUser';


import {
    CHECK_SUBSCRIBE_USER_REQUEST,
    CHECK_SUBSCRIBE_USER_SUCCESS,
    CHECK_SUBSCRIBE_USER_FAILURE
} from '../actions/subscribe/chechSubscribeUser'


import {
    UNSUBSCRIBE_USER_REQUEST,
    UNSUBSCRIBE_USER_SUCCESS,
    UNSUBSCRIBE_USER_FAILURE,
  } from '../actions/subscribe/unsubscribeUser';




  
const initialState = {
    isError: false,
    isLoading: false,
    isSubscribe: false,
    errorCode: ''
}

export interface SubscribeUserTypes {
    isError: boolean,
    isLoading: boolean,
    isSubscribe: boolean,
    errorCode: string|number
}



    

export function subscribeUserReducer(state = initialState, action: { type: string, payload?: object }) {
    switch(action.type) {
        case SUBSCRIBE_USER_REQUEST:
            return {
                    ...state,
                    isError: false,
                    isLoading: true,
                };
        case SUBSCRIBE_USER_SUCCESS:
            return {
                    ...state,
                    isError: false,
                    isLoading: false,
                };
        case SUBSCRIBE_USER_FAILURE:
            return {
                    ...state,
                    isError: true,
                    isLoading: false, 
                    errorCode: action.payload
                };
        case UNSUBSCRIBE_USER_REQUEST:
            return {
                    ...state,
                    isError: false,
                    isLoading: true,
                };
        case UNSUBSCRIBE_USER_SUCCESS:
            return {
                    ...state,
                    isError: false,
                    isLoading: false,
                };
        case UNSUBSCRIBE_USER_FAILURE:
            return {
                    ...state,
                    isError: true,
                    isLoading: false, 
                    errorCode: action.payload
                };
        case CHECK_SUBSCRIBE_USER_REQUEST:
            return {
                    ...state,
                    isError: false,
                    isLoading: true,
                };
        case CHECK_SUBSCRIBE_USER_SUCCESS:
            return {
                    ...state,
                    isError: false,
                    isLoading: false,
                    isSubscribe: action.payload
                };
        case CHECK_SUBSCRIBE_USER_FAILURE:
            return {
                    ...state,
                    isError: true,
                    isLoading: false, 
                    errorCode: action.payload
                };
        default:
            return state;
    }

}