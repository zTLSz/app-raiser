import { db } from "../../firebase/firebase";
import { put, call, takeEvery } from "redux-saga/effects";
import firebase from "firebase";
import { requestCheckSubscribeUser } from "./chechSubscribeUser";
import { requestGetProfile } from "../getProfile";

export const UNSUBSCRIBE_USER_REQUEST = "UNSUBSCRIBE_USER_REQUEST";
export const UNSUBSCRIBE_USER_SUCCESS = "UNSUBSCRIBE_USER_SUCCESS";
export const UNSUBSCRIBE_USER_FAILURE = "UNSUBSCRIBE_USER_FAILURE";

export const requestUnsubscribeUser = (
  subscribingUserId: number,
  subscribingUserName: string,
  subscribeTargetId: number,
  subscribeTargetName: string
) => {
  return {
    type: UNSUBSCRIBE_USER_REQUEST,
    payload: {
      subscribingUserId: subscribingUserId,
      subscribingUserName: subscribingUserName,
      subscribeTargetId: subscribeTargetId,
      subscribeTargetName: subscribeTargetName,
    },
  };
};

export const receiveUnsubscribeUser = (data: any) => {
  return {
    type: UNSUBSCRIBE_USER_SUCCESS,
    payload: data,
  };
};

export const unsubscribeUserError = (code: string | number) => {
  return {
    type: UNSUBSCRIBE_USER_FAILURE,
    payload: code,
  };
};

interface UnsubscribeUserTypes {
  subscribingUserId: number;
  subscribingUserName: string;
  subscribeTargetId: number;
  subscribeTargetName: string;
}

export function* sagaUnsubscribeUser(action: {
  payload: UnsubscribeUserTypes;
  type: string;
}): Generator<any, void, any> {
  const {
    subscribingUserId,
    subscribingUserName,
    subscribeTargetId,
    subscribeTargetName,
  } = action.payload;

  try {
    const payload = yield call(() =>
      requestUnsubscribeUser(
        subscribingUserId,
        subscribingUserName,
        subscribeTargetId,
        subscribeTargetName
      )
    );
    yield call(() => removeFollower(action.payload));
    yield call(() => removeFollowing(action.payload));
    yield put(requestCheckSubscribeUser(subscribingUserId, subscribeTargetId));
    yield put(requestGetProfile(subscribeTargetId));
    yield put(receiveUnsubscribeUser(payload));
  } catch (e) {
    yield put(unsubscribeUserError(e));
  }
}

async function removeFollower(payload: UnsubscribeUserTypes) {
  const {
    subscribingUserId,
    subscribingUserName,
    subscribeTargetId,
    subscribeTargetName,
  } = payload;

  const response = await db
    .collection("userinfo")
    .doc(`${subscribeTargetId}`)
    .update({
      followers: firebase.firestore.FieldValue.increment(-1),
    });
  /*

  if (type === 'LIKE') {
    const response = await db.collection("userwall").doc(`${userid}`).collection("posts").doc(postid).update({
      likes: likes + 1
    })
  }

  if (type === 'DISLIKE') {
    const response = await db.collection("userwall").doc(`${userid}`).collection("posts").doc(postid).update({
      dislikes: dislikes + 1
    })
  }

  */
  const removeFollowerdb = await db
    .collection("userinfo")
    .doc(`${subscribeTargetId}`)
    .collection("followers")
    .doc(`${subscribingUserId}`)
    .delete();
}

async function removeFollowing(payload: UnsubscribeUserTypes) {
  const {
    subscribingUserId,
    subscribingUserName,
    subscribeTargetId,
    subscribeTargetName,
  } = payload;

  const response = await db
    .collection("userinfo")
    .doc(`${subscribingUserId}`)
    .update({
      following: firebase.firestore.FieldValue.increment(-1),
    });
  /*

  if (type === 'LIKE') {
    const response = await db.collection("userwall").doc(`${userid}`).collection("posts").doc(postid).update({
      likes: likes + 1
    })
  }

  if (type === 'DISLIKE') {
    const response = await db.collection("userwall").doc(`${userid}`).collection("posts").doc(postid).update({
      dislikes: dislikes + 1
    })
  }

  */
  const removeFollowingdb = await db
    .collection("userinfo")
    .doc(`${subscribingUserId}`)
    .collection("following")
    .doc(`${subscribeTargetId}`)
    .delete();
}
