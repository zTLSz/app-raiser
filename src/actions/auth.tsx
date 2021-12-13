import { myFirebase, db } from "../firebase/firebase";
import { put, call } from "redux-saga/effects";
import { getCurrentUserInfo } from "./getCurrentUserInfo";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAILURE = "VERIFY_FAILURE";

export const requestLogin = (email: string, password: string) => {
  return {
    type: LOGIN_REQUEST,
    payload: { e: email, p: password },
  };
};

export const receiveLogin = (user: any, usercounter: number, userinfo: any) => {
  return {
    type: LOGIN_SUCCESS,
    user,
    usercounter,
    userinfo,
  };
};

export const loginError = (error: {
  code: string;
  message: string;
  a: null;
}) => {
  return {
    type: LOGIN_FAILURE,
    payload: error.code,
  };
};

export const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logoutError = (error: {
  code: string;
  message: string;
  a: null;
}) => {
  return {
    type: LOGOUT_FAILURE,
    payload: error.code,
  };
};

export const verifyRequest = () => {
  console.log("STAARTED22222222222222231231321");
  return {
    type: VERIFY_REQUEST,
  };
};

export const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS,
  };
};

export const verifyError = (error: {
  code: string;
  message: string;
  a: null;
}) => {
  return {
    type: VERIFY_FAILURE,
    payload: error.code,
  };
};

interface Generator<T, TReturn, TNext> {}

// login
// payload.user.uid

export function* sagaLoginWorker(action: {
  payload: { e: string; p: string };
  type: string;
}): Generator<any[], void, any> {
  try {
    const payload = yield call(() =>
      fetchAuth(action.payload.e, action.payload.p)
    );
    const usersystemdata = yield call(() =>
      getCurrentUserCount(payload.user.uid)
    );
    const userinfo = yield call(() =>
      getCurrentUserInfo(usersystemdata.usercounter)
    );

    yield put(receiveLogin(payload, usersystemdata.usercounter, userinfo));
  } catch (e) {
    yield put(loginError(e));
  }
}

async function fetchAuth(e: string, p: string) {
  const response = await myFirebase.auth().signInWithEmailAndPassword(e, p);

  return response;
}

async function getCurrentUserCount(uid: string) {
  const response = await db.collection("usersystemdata").doc(uid).get();

  if (response.exists) {
    return response.data();
  }
  throw new Error("error!");
}

// logout

export function* sagaLogoutWorker(action: {
  payload: { e: string; p: string };
  type: string;
}): Generator<any[], void, any> {
  try {
    const payload = yield call(() => fetchLogout());
    yield put(receiveLogout());
  } catch (e) {
    yield put(logoutError(e));
  }
}

async function fetchLogout() {
  const response = await myFirebase.auth().signOut();
  return response;
}

// verify

function onAuthStateChanged() {
  return new Promise((resolve, reject) => {
    myFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("Ops!"));
      }
    });
  });
}

export function* sagaVerifyWorker(action: {
  payload: { e: string; p: string };
  type: string;
}): Generator<any[], void, any> {
  try {
    const payload = yield call(onAuthStateChanged);
    const usersystemdata = yield call(() => getCurrentUserCount(payload.uid));
    const userinfo = yield call(() =>
      getCurrentUserInfo(usersystemdata.usercounter)
    );

    yield put(receiveLogin(payload, usersystemdata.usercounter, userinfo));
  } catch (e) {
    yield put(verifyError(e));
  }
}
