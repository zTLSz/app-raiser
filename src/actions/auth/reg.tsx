import { myFirebase, db } from "../../firebase/firebase";
import { put, call } from "redux-saga/effects";
import firebase from "firebase";

export const REG_REQUEST = "REG_REQUEST";
export const REG_REDIRECT = "REG_REDIRECT";
export const REG_SUCCESS = "REG_SUCCESS";
export const REG_FAILURE = "REG_FAILURE";
export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";

export const requestReg = (
  email: string,
  password: string,
  nickname: string
) => {
  return {
    type: REG_REQUEST,
    payload: { e: email, p: password, n: nickname },
  };
};

export const receiveReg = (data: any) => {
  return {
    type: REG_SUCCESS,
    payload: data,
  };
};

export const regError = (code: string | number) => {
  return {
    type: REG_FAILURE,
    payload: code,
  };
};

export const redirectReg = () => {
  return {
    type: REG_REDIRECT,
  };
};

export function* sagaRegWorker(action: {
  payload: { e: string; p: string; n: string };
  type: string;
}): Generator<any, void, any> {
  const { e, p, n } = action.payload;
  try {
    if (n.length < 3) {
      throw new Error();
    }
    const payload = yield call(() => fetchReg(e, p));
    const usercounter = yield call(() => checkUserCount());
    yield call(() => addUserInfo(e, usercounter, n));
    yield call(() => addUserSystemData(payload.user.uid, e, usercounter));
    yield put(receiveReg(payload));
  } catch (e) {
    yield put(regError(e));
  }
}

async function checkUserCount() {
  const qSnap = await db.collection("usersystemdata").get();
  return qSnap.size;
}

async function fetchReg(e: string, p: string) {
  const response = await myFirebase.auth().createUserWithEmailAndPassword(e, p);
  return response;
}

async function addUserInfo(
  email: string,
  usercounter: number,
  nickname: string
) {
  const response = await db
    .collection("userinfo")
    .doc(`${usercounter}`)
    .set({
      about: "",
      age: 0,
      avatar: null,
      color: "#000000",
      email: email,
      followers: 0,
      following: 0,
      isAdmin: false,
      nickname: nickname,
      regdate: firebase.firestore.Timestamp.fromDate(new Date()),
    });
}

async function addUserSystemData(uid: string, email: string, usercounter: any) {
  const response = await db.collection("usersystemdata").doc(uid).set({
    email: email,
    usercounter: usercounter,
  });
}
