import { db } from "../../firebase/firebase";
import { put, call, takeEvery } from "redux-saga/effects";
import firebase from "firebase";

export const GET_SUBSCRIBERS_LIST_REQUEST = "GET_SUBSCRIBERS_LIST_REQUEST";
export const GET_SUBSCRIBERS_LIST_SUCCESS = "GET_SUBSCRIBERS_LIST_SUCCESS";
export const GET_SUBSCRIBERS_LIST_FAILURE = "GET_SUBSCRIBERS_LIST_FAILURE";

export const requestGetSubscribersList = (userId: number) => {
  return {
    type: GET_SUBSCRIBERS_LIST_REQUEST,
    payload: { userId: userId },
  };
};

export const receiveGetSubscribersList = (data: any) => {
  return {
    type: GET_SUBSCRIBERS_LIST_SUCCESS,
    payload: data,
  };
};

export const getSubscribersListError = (code: string | number) => {
  return {
    type: GET_SUBSCRIBERS_LIST_FAILURE,
    payload: code,
  };
};

interface GetSubscribersUserTypes {
  userId: number;
}

interface Generator<T, TReturn, TNext> {}

export function* sagaGetSubscribersList(action: {
  payload: GetSubscribersUserTypes;
  type: string;
}): Generator<any[], void, any> {
  const { userId } = action.payload;

  try {
    yield call(() => requestGetSubscribersList(userId));
    const payload = yield call(() => getSubscribersList(action.payload));
    yield put(receiveGetSubscribersList(payload));
  } catch (e) {
    yield put(getSubscribersListError(e));
  }
}

async function getSubscribersList(payload: GetSubscribersUserTypes) {
  const { userId } = payload;

  console.log(userId);

  const test1: any = await db
    .collection("userinfo")
    .doc(`${userId}`)
    .collection("followers")
    .get();

  const test2: any = await db
    .collection("userinfo")
    .doc(`${userId}`)
    .collection("following")
    .get();

  console.log(test2.docs.map((doc: any) => doc.data()));

  return {
    followers: test1.docs.map((doc: any) => doc.data()),
    following: test2.docs.map((doc: any) => doc.data()),
  };
}
