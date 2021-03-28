import {
    GET_SUBSCRIBERS_LIST_REQUEST,
    GET_SUBSCRIBERS_LIST_SUCCESS,
    GET_SUBSCRIBERS_LIST_FAILURE,
  } from '../actions/subscribe/getSubscribersList';







  
const initialState = {
    isError: false,
    isLoading: false,
    data: [],
    errorCode: ''
}

export interface SubscribeUserTypes {
    isError: boolean,
    isLoading: boolean,
    data: any[],
    errorCode: string|number
}



    

export function getSubscribeListReducer(state = initialState, action: { type: string, payload?: object }) {
    switch(action.type) {
        case GET_SUBSCRIBERS_LIST_REQUEST:
            return {
                    ...state,
                    isError: false,
                    isLoading: true,
                };
        case GET_SUBSCRIBERS_LIST_SUCCESS:
            return {
                    ...state,
                    isError: false,
                    isLoading: false,
                    data: action.payload
                };
        case GET_SUBSCRIBERS_LIST_FAILURE:
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