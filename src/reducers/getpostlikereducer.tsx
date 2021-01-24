import {
    GET_POST_LIKE_REQUEST,
    GET_POST_LIKE_SUCCESS,
    GET_POST_LIKE_FAILURE,
  } from "../actions/postlikes/getPostLike";


  
const initialState = {
    isError: false,
    isLoading: false,
    errorCode: '',
    data: []
}

export interface GetPostLikeTypes {
    isError: boolean,
    isLoading: boolean,
    errorCode: string|number,
    data: any
}



    

export function getPostLikeReducer(state = initialState, action: { type: string, payload?: object }) {
    switch(action.type) {
        case GET_POST_LIKE_REQUEST:
            return {
                    ...state,
                    isError: false,
                    isLoading: true,
                };
        case GET_POST_LIKE_SUCCESS:
            return {
                    ...state,
                    isError: false,
                    isLoading: false,
                    data: action.payload
                };
        case GET_POST_LIKE_FAILURE:
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