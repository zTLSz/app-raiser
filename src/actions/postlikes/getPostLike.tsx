import { db } from "../../firebase/firebase";
import { put, call, takeEvery } from "redux-saga/effects";
// import firebase from 'firebase'

export const GET_POST_LIKE_REQUEST = "GET_POST_LIKE_REQUEST";
export const GET_POST_LIKE_SUCCESS = "GET_POST_LIKE_SUCCESS";
export const GET_POST_LIKE_FAILURE = "GET_POST_LIKE_FAILURE";

export const requestGetPostLike = (postid: string, userid: number) => {
  return {
    type: GET_POST_LIKE_REQUEST,
    payload: { postid: postid, userid: userid },
  };
};

export const receiveGetPostLike = (data: any) => {
  return {
    type: GET_POST_LIKE_SUCCESS,
    payload: data,
  };
};

export const getPostLikeError = (error: { code: string; message: string }) => {
  return {
    type: GET_POST_LIKE_FAILURE,
    payload: error.code,
  };
};

interface PostLikeTypes {
  postid: string;
  userid: number;
}

export function* sagaGetPostLike(action: {
  payload: PostLikeTypes;
  type: string;
}) {
  const { postid, userid } = action.payload;

  try {
    const payload = yield call(() => requestGetPostLike(postid, userid));
    const likes = yield call(() => getLike(action.payload));
    yield put(receiveGetPostLike(likes));
  } catch (e) {
    yield put(getPostLikeError(e));
  }
}

async function getLike(payload: PostLikeTypes) {
  const { postid, userid } = payload;

  const likeinfo = await db
    .collection("userwall")
    .doc(`${userid}`)
    .collection("posts")
    .doc(postid)
    .collection("likes")
    .get();

  console.log(likeinfo.docs.map((doc) => doc.data()));
  return likeinfo.docs.map((doc) => doc.data());
}
