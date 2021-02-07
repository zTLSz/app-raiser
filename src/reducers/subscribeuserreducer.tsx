import {
    SUBSCRIBE_USER_REQUEST,
    SUBSCRIBE_USER_SUCCESS,
    SUBSCRIBE_USER_FAILURE,
  } from '../actions/subscribe/subscribeUser';



  
const initialState = {
    isError: false,
    isLoading: false,
    errorCode: ''
}

export interface SubscribeUserTypes {
    isError: boolean,
    isLoading: boolean,
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
        default:
            return state;
    }

}