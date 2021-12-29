import { db } from "../../firebase/firebase";
import { put, call, takeEvery } from "redux-saga/effects";
import firebase from "firebase";
import { StringifyOptions } from "querystring";

export const CHECK_POST_LIKE_REQUEST = "CHECK_POST_LIKE_REQUEST";
export const CHECK_POST_LIKE_SUCCESS = "CHECK_POST_LIKE_SUCCESS";
export const CHECK_POST_LIKE_FAILURE = "CHECK_POST_LIKE_FAILURE";

export const requestCheckPostLike = (
  postid: string,
  authorid: number,
  authorname: string,
  userid: number,
  likes: number
) => {
  return {
    type: CHECK_POST_LIKE_REQUEST,
    payload: {
      postid: postid,
      authorid: authorid,
      authorname: authorname,
      userid: userid,
      likes: likes,
    },
  };
};

export const receiveCheckPostLike = (data: any) => {
  return {
    type: CHECK_POST_LIKE_SUCCESS,
    payload: data,
  };
};

export const checkPostLikeError = (error: {
  code: string;
  message: string;
}) => {
  return {
    type: CHECK_POST_LIKE_FAILURE,
    payload: error.code,
  };
};

interface PostLikeTypes {
  postid: string;
  authorid: number;
  authorname: string;
  userid: number;
  likes: number;
}

interface IError {
  code: string;
  message: string;
}

export function* sagaCheckPostLike(action: {
  payload: PostLikeTypes;
  type: string;
}): Generator {
  const { postid, authorid, authorname, userid, likes } = action.payload;

  try {
    const payload = yield call(() =>
      requestCheckPostLike(postid, authorid, authorname, userid, likes)
    );
    yield call(() => checkLike(action.payload));
    yield put(receiveCheckPostLike(payload));
  } catch (error: any) {
    yield put(checkPostLikeError(error));
  }
}

async function checkLike(payload: PostLikeTypes) {
  const { postid, authorid, userid } = payload;

  const likeinfo = await db
    .collection("userwall")
    .doc(`${userid}`)
    .collection("posts")
    .doc(postid)
    .collection("likes")
    .doc(`${authorid}`)
    .get();
}
