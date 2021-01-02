//import { db } from "../firebase/firebase";
import { put, call } from 'redux-saga/effects'
// import firebase from 'firebase'
import { getCurrentUserWall } from './getCurrentUserWall'



export const GET_WALL_POSTS_REQUEST = "GET_WALL_POSTS_REQUEST";
export const GET_WALL_POSTS_SUCCESS = "GET_WALL_POSTS_SUCCESS";
export const GET_WALL_POSTS_FAILURE = "GET_WALL_POSTS_FAILURE";





export const requestGetWallPosts = (counter: number, author: number) => {
  return {
    type: GET_WALL_POSTS_REQUEST,
    payload: { counter: counter, author: author }
  };
};

export const receiveGetWallPosts = (data: any) => {
  return {
    type: GET_WALL_POSTS_SUCCESS,
    payload: data
  };
};

export const getWallPostsError = (error: { code: string, message: string, a: null }) => {
  return {
    type: GET_WALL_POSTS_FAILURE,
    payload: error.code
  };
};

interface GetWallTypes {
  counter: number,
  author: number
}


export function* sagaGetWallPostsWorker(action: { payload: GetWallTypes, type: string }) {
    const { counter, author } = action.payload

    try {
      const posts = yield call(() => getCurrentUserWall(counter, author))
      yield put(receiveGetWallPosts(posts))
    } catch (e) {
      yield put(getWallPostsError(e))
    }
}



