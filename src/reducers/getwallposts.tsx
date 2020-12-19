import {
    GET_WALL_POSTS_REQUEST,
    GET_WALL_POSTS_SUCCESS,
    GET_WALL_POSTS_FAILURE,
  } from "../actions/getWallPosts";



  
const initialState = {
    isLoading: false,
    isError: false,
    errorCode: '',
    postsdata: {
        posts: []
    }
}

export interface GetWallTypes {
    isLoading: boolean,
    errorCode: string|number,
    isError: boolean,
    postsdata: {
        posts: any[]
    }
}



    

export function getWallPostsReducer(state = initialState, action: { type: string, payload?: object }) {
    switch(action.type) {
        case GET_WALL_POSTS_REQUEST:
            return {
                    ...state,
                    isLoading: true,
                    isError: false,
                    errorCode: ''
                };
        case GET_WALL_POSTS_SUCCESS:
            return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    errorCode: '',
                    postsdata: action.payload
                };
        case GET_WALL_POSTS_FAILURE:
            return {
                    ...state,
                    isLoading: false, 
                    isError: true,
                    errorCode: action.payload,
                    postsdata: {
                        posts: []
                    }
                };
        default:
            return state;
    }

}