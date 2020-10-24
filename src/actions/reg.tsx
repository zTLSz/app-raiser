import { myFirebase, db } from "../firebase/firebase";
import { put, call } from 'redux-saga/effects'



export const REG_REQUEST = "REG_REQUEST";
export const REG_REDIRECT = "REG_REDIRECT";
export const REG_SUCCESS = "REG_SUCCESS";
export const REG_FAILURE = "REG_FAILURE";
export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";





export const requestReg = (email: string, password: string, login: string) => {
  return {
    type: REG_REQUEST,
    payload: { e: email, p: password, l: login }
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




export function* sagaRegWorker(action: {payload: {e: string, p: string, l: string}, type: string}) {
    try {
      const payload = yield call(() => fetchReg(action.payload.e, action.payload.p))
      yield call(() => addDbData(action.payload.l))
      yield put(receiveReg(payload))
    } catch (e) {
      yield put(regError(e))
    }
}

async function fetchReg(e: string, p: string) {
    const response = await myFirebase.auth().createUserWithEmailAndPassword(e, p)
    return response
}

async function addDbData(login: string) {
  const response = await db.collection("users").doc(login).set({
    test: '111'
  })
}