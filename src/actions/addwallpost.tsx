import { db } from "../firebase/firebase";
import { put, call, takeEvery } from 'redux-saga/effects'
import firebase from 'firebase'
import { getCurrentUserWall } from './getCurrentUserWall'
import { requestGetWallPosts } from './getWallPosts'



export const ADD_WALL_POST_REQUEST = "ADD_WALL_POST_REQUEST";
export const ADD_WALL_POST_SUCCESS = "ADD_WALL_POST_SUCCESS";
export const ADD_WALL_POST_FAILURE = "ADD_WALL_POST_FAILURE";





export const requestAddWallPost = (text: string, date: number, counter: number, author: number) => {
  return {
    type: ADD_WALL_POST_REQUEST,
    payload: { text: text, date: date, counter: counter, author: author }
  };
};

export const receiveAddWallPost = (data: any) => {
  return {
    type: ADD_WALL_POST_SUCCESS,
    payload: data
  };
};

export const addWallPostError = (error: { code: string, message: string, a: null }) => {
  return {
    type: ADD_WALL_POST_FAILURE,
    payload: error.code
  };
};

interface AddWallTypes {
  text: string, 
  date: number, 
  counter: number, 
  author: number
}


export function* sagaAddWallPostWorker(action: { payload: AddWallTypes, type: string }) {
    const { text, date, counter, author } = action.payload

    try {
      if (text.length < 3) {
        throw new Error(); 
      }
      const payload = yield call(() => requestAddWallPost(text, date, counter, author))
      yield call(() => addPost(action.payload))
      yield put(requestGetWallPosts(counter))
      yield put(receiveAddWallPost(payload))
    } catch (e) {
      yield put(addWallPostError(e))
    }
}



async function addPost(payload: AddWallTypes) {
  const { text, date, counter, author  } = payload;
  const response = await db.collection("userwall").doc(`${counter}`).update({
    posts: firebase.firestore.FieldValue.arrayUnion({
        author: author,
        text: text,
        date: date,
        counter: counter,
        likes: 0,
        dislikes: 0
    })
  })
}

