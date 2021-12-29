import { db } from "../../firebase/firebase";
import { put, call, takeEvery } from "redux-saga/effects";
import firebase from "firebase";

export const REMOVE_POST_LIKE_REQUEST = "REMOVE_POST_LIKE_REQUEST";
export const REMOVE_POST_LIKE_SUCCESS = "REMOVE_POST_LIKE_SUCCESS";
export const REMOVE_POST_LIKE_FAILURE = "REMOVE_POST_LIKE_FAILURE";

export const requestDeletePostLike = (
  postid: string,
  authorid: number,
  userid: number,
  likes: number,
  dislikes: number,
  currtype: string | undefined
) => {
  return {
    type: REMOVE_POST_LIKE_REQUEST,
    payload: {
      postid: postid,
      authorid: authorid,
      userid: userid,
      likes: likes,
      dislikes: dislikes,
      currtype: currtype,
    },
  };
};

export const receiveDeletePostLike = (data: any) => {
  return {
    type: REMOVE_POST_LIKE_SUCCESS,
    payload: data,
  };
};

export const deletePostLikeError = (code: string | number) => {
  return {
    type: REMOVE_POST_LIKE_FAILURE,
    payload: code,
  };
};

interface PostLikeTypes {
  postid: string;
  authorid: number;
  userid: number;
  likes: number;
  dislikes: number;
  currtype: string | undefined;
}

export function* sagaDeletePostLike(action: {
  payload: PostLikeTypes;
  type: string;
}): Generator<any, void, any> {
  const { postid, authorid, userid, likes, dislikes, currtype } =
    action.payload;

  try {
    const payload = yield call(() =>
      requestDeletePostLike(postid, authorid, userid, likes, dislikes, currtype)
    );
    yield call(() => removeLike(action.payload));
    yield put(receiveDeletePostLike(payload));
  } catch (e) {
    yield put(deletePostLikeError(e));
  }
}

async function removeLike(payload: PostLikeTypes) {
  const { postid, authorid, userid, likes, dislikes, currtype } = payload;

  if (currtype === "LIKE") {
    const response = await db
      .collection("userwall")
      .doc(`${userid}`)
      .collection("posts")
      .doc(postid)
      .update({
        likes: likes - 1,
      });
  }

  if (currtype === "DISLIKE") {
    const response = await db
      .collection("userwall")
      .doc(`${userid}`)
      .collection("posts")
      .doc(postid)
      .update({
        dislikes: dislikes - 1,
      });
  }
  const likeinfo = await db
    .collection("userwall")
    .doc(`${userid}`)
    .collection("posts")
    .doc(postid)
    .collection("likes")
    .doc(`${authorid}`)
    .delete();
}
