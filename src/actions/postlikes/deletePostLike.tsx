import { db } from "../../firebase/firebase";
import { put, call, takeEvery } from 'redux-saga/effects'
import firebase from 'firebase'



export const REMOVE_POST_LIKE_REQUEST = "REMOVE_POST_LIKE_REQUEST";
export const REMOVE_POST_LIKE_SUCCESS = "REMOVE_POST_LIKE_SUCCESS";
export const REMOVE_POST_LIKE_FAILURE = "REMOVE_POST_LIKE_FAILURE";





export const requestDeletePostLike =  (postid: string, 
                                    authorid: number, 
                                    userid: number,
                                    likes: number) => {
  return {
    type: REMOVE_POST_LIKE_REQUEST,
    payload: { postid: postid, authorid: authorid, userid: userid, likes: likes }
  };
};

export const receiveDeletePostLike = (data: any) => {
  return {
    type: REMOVE_POST_LIKE_SUCCESS,
    payload: data
  };
};

export const deletePostLikeError = (error: { code: string, message: string }) => {
  return {
    type: REMOVE_POST_LIKE_FAILURE,
    payload: error.code
  };
};

interface PostLikeTypes {
    postid: string, 
    authorid: number, 
    userid: number,
    likes: number
}


export function* sagaDeletePostLike(action: { payload: PostLikeTypes, type: string }) {
    const { postid, authorid, userid, likes } = action.payload

    try {
      const payload = yield call(() => requestDeletePostLike(postid, authorid, userid, likes))
      yield call(() => removeLike(action.payload))
      yield put(receiveDeletePostLike(payload))
    } catch (e) {
      yield put(deletePostLikeError(e))
    }
}



async function removeLike(payload: PostLikeTypes) {
  const { postid, authorid, userid, likes } = payload
  const response = await db.collection("userwall").doc(`${userid}`).collection("posts").doc(postid).update({
    likes: likes - 1
  })
  const likeinfo = await db.collection("userwall")
                        .doc(`${userid}`).collection("posts")
                        .doc(postid).collection('likes').doc(`${authorid}`).delete()
}