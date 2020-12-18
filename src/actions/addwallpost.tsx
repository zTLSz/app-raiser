import { myFirebase, db } from "../firebase/firebase";
import { put, call } from 'redux-saga/effects'
import firebase from 'firebase'
import { getCurrentUserWall } from './getCurrentUserWall'



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
      const payload = yield call(() => requestAddWallPost(text, date, counter, author))
      const posts = yield call(() => getCurrentUserWall(counter))
      console.log(posts)
      yield call(() => addPost(action.payload, posts))
      // yield call(() => addUserSystemData(payload.user.uid, action.payload.e, usercounter))
      yield put(receiveAddWallPost(payload))
    } catch (e) {
      yield put(addWallPostError(e))
    }
}



async function addPost(payload: AddWallTypes, posts: any) {
  const { text, date, counter, author  } = payload;
  const response = await db.collection("userwall").doc(`${counter}`).update({
    posts: [
      ...posts.posts,
      {
        author: author,
        text: text,
        date: date,
        counter: counter,
        likes: 0,
        dislikes: 0
      }
    ]
  })
}


/*

        async function test22() {
            const response = await db.collection("userwall").doc(`8`).set({
                posts: [
                    {
                        author: 1,
                        text: '1111',
                        time: 0,
                        likes: 0
                    },
                    {
                        author: 2,
                        text: '1211',
                        time: 0,
                        likes: 0
                    }
                ]
            })
            
        }

        test22()
*/