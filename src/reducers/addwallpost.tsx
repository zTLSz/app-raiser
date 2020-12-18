import {
    ADD_WALL_POST_REQUEST,
    ADD_WALL_POST_SUCCESS,
    ADD_WALL_POST_FAILURE,
  } from "../actions/addwallpost";


  
const initialState = {
    isLoading: false,
    errorCode: ''
}

export interface AddWallTypes {
    isLoading: boolean,
    errorCode: string|number
}



    

export function addWallPostReducer(state = initialState, action: { type: string, payload?: object }) {
    switch(action.type) {
        case ADD_WALL_POST_REQUEST:
            return {
                    ...state,
                    isLoading: true,
                    errorCode: ''
                };
        case ADD_WALL_POST_SUCCESS:
            return {
                    ...state,
                    isLoading: false,
                    errorCode: ''
                };
        case ADD_WALL_POST_FAILURE:
            return {
                    ...state,
                    isLoading: false, 
                    errorCode: action.payload
                };
        default:
            return state;
    }

}