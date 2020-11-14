import { myFirebase, db } from "../firebase/firebase";
import { put, call } from 'redux-saga/effects'
import firebase from 'firebase'



export const REG_REQUEST = "REG_REQUEST";
export const REG_REDIRECT = "REG_REDIRECT";
export const REG_SUCCESS = "REG_SUCCESS";
export const REG_FAILURE = "REG_FAILURE";
export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";





export const requestReg = (email: string, password: string) => {
  return {
    type: REG_REQUEST,
    payload: { e: email, p: password }
  };
};

export const receiveReg = (data: any) => {
  return {
    type: REG_SUCCESS,
    payload: data
  };
};

export const regError = (error: { code: string, message: string, a: null }) => {
  return {
    type: REG_FAILURE,
    payload: error.code
  };
};


export const redirectReg = () => {
  return {
    type: REG_REDIRECT,
  };
};




export function* sagaRegWorker(action: {payload: {e: string, p: string}, type: string}) {
    try {
      const payload = yield call(() => fetchReg(action.payload.e, action.payload.p))
      const usercounter = yield call(() => checkUserCount())
      yield call(() => addUserInfo(action.payload.e, usercounter))
      yield call(() => addUserSystemData(payload.user.uid, action.payload.e, usercounter))
      yield put(receiveReg(payload))
    } catch (e) {
      yield put(regError(e))
    }
}


async function checkUserCount() {
  const qSnap = await db.collection("usersystemdata").get()
  return qSnap.size
}

async function fetchReg(e: string, p: string) {
    const response = await myFirebase.auth().createUserWithEmailAndPassword(e, p)
    return response
}

async function addUserInfo(email: string, usercounter: number) {
  const response = await db.collection("userinfo").doc(`${usercounter}`).set({
    about: '',
    age: 0,
    avatar: null,
    color: "#000000",
    email: email,
    followers: 0,
    following: 0,
    isAdmin: false,
    nickname: 'anonim',
    regdate: firebase.firestore.Timestamp.fromDate(new Date())
  })
}

async function addUserSystemData(uid: string, email: string, usercounter: any) {
  const response = await db.collection("usersystemdata").doc(uid).set({
      email: email,
      usercounter: usercounter
  }) 
}