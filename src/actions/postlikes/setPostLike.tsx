import { db } from "../../firebase/firebase";
import { put, call, takeEvery } from 'redux-saga/effects'
import firebase from 'firebase'



export const SET_POST_LIKE_REQUEST = "SET_POST_LIKE_REQUEST";
export const SET_POST_LIKE_SUCCESS = "SET_POST_LIKE_SUCCESS";
export const SET_POST_LIKE_FAILURE = "SET_POST_LIKE_FAILURE";





export const requestSetPostLike =  (postid: string, 
                                    authorid: number, 
                                    authorname: string, 
                                    userid: number,
                                    likes: number) => {
  return {
    type: SET_POST_LIKE_REQUEST,
    payload: { postid: postid, authorid: authorid, authorname: authorname, userid: userid, likes: likes }
  };
};

export const receiveSetPostLike = (data: any) => {
  return {
    type: SET_POST_LIKE_SUCCESS,
    payload: data
  };
};

export const setPostLikeError = (error: { code: string, message: string }) => {
  return {
    type: SET_POST_LIKE_FAILURE,
    payload: error.code
  };
};

interface PostLikeTypes {
    postid: string, 
    authorid: number, 
    authorname: string,
    userid: number,
    likes: number
}


export function* sagaSetPostLike(action: { payload: PostLikeTypes, type: string }) {
    const { postid, authorid, authorname, userid, likes } = action.payload

    try {
      const payload = yield call(() => requestSetPostLike(postid, authorid, authorname, userid, likes))
      yield call(() => addLike(action.payload))
      yield put(receiveSetPostLike(payload))
    } catch (e) {
      yield put(setPostLikeError(e))
    }
}



async function addLike(payload: PostLikeTypes) {
  const { postid, authorid, authorname, userid, likes } = payload
  const response = await db.collection("userwall").doc(`${userid}`).collection("posts").doc(postid).update({
    likes: likes + 1
  })
  const likeinfo = await db.collection("userwall")
                        .doc(`${userid}`).collection("posts")
                        .doc(postid).collection('likes').doc(`${authorid}`).set({
                          id: authorid,
                          name: authorname,
                          userinfo: db.doc(`/userinfo/${authorid}`)
                        })

  /*

  const getLikedUserInfo =  await db.collection("userwall")
    .doc(`${userid}`).collection("posts")
    .doc(postid).collection('likes').doc(`${authorid}`).get()

  let getLikedUserInfoData = getLikedUserInfo.data()

  if (getLikedUserInfoData?.userinfo) {
    getLikedUserInfoData.userinfo.get().then((user: any) => console.log(user.data()))
  }

  */



}