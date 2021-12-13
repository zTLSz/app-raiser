import { db } from "../../firebase/firebase";
import { put, call, takeEvery } from "redux-saga/effects";
import firebase from "firebase";

export const CHECK_SUBSCRIBE_USER_REQUEST = "CHECK_SUBSCRIBE_USER_REQUEST";
export const CHECK_SUBSCRIBE_USER_SUCCESS = "CHECK_SUBSCRIBE_USER_SUCCESS";
export const CHECK_SUBSCRIBE_USER_FAILURE = "CHECK_SUBSCRIBE_USER_FAILURE";

export const requestCheckSubscribeUser = (
  subscribingUserId: number,
  subscribeTargetId: number
) => {
  return {
    type: CHECK_SUBSCRIBE_USER_REQUEST,
    payload: {
      subscribingUserId: subscribingUserId,
      subscribeTargetId: subscribeTargetId,
    },
  };
};

export const receiveCheckSubscribeUser = (data: any) => {
  return {
    type: CHECK_SUBSCRIBE_USER_SUCCESS,
    payload: data,
  };
};

export const checkSubscribeUserError = (error: {
  code: string;
  message: string;
}) => {
  return {
    type: CHECK_SUBSCRIBE_USER_FAILURE,
    payload: error.code,
  };
};

interface CheckSubscribeUserTypes {
  subscribingUserId: number;
  subscribeTargetId: number;
}

interface Generator<T, TReturn, TNext> {}

export function* sagaCheckSubscribeUser(action: {
  payload: CheckSubscribeUserTypes;
  type: string;
}): Generator<any[], void, any> {
  const { subscribingUserId, subscribeTargetId } = action.payload;

  try {
    yield call(() =>
      requestCheckSubscribeUser(subscribingUserId, subscribeTargetId)
    );
    const payload = yield call(() => checkSubscribe(action.payload));
    yield put(receiveCheckSubscribeUser(payload));
  } catch (e) {
    yield put(checkSubscribeUserError(e));
  }
}

async function checkSubscribe(payload: CheckSubscribeUserTypes) {
  const { subscribingUserId, subscribeTargetId } = payload;

  const likeinfo = await db
    .collection("userinfo")
    .doc(`${subscribeTargetId}`)
    .collection("followers")
    .doc(`${subscribingUserId}`)
    .get();

  if (likeinfo.data()) {
    return true;
  }

  return false;
}
