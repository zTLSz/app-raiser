import { myFirebase } from "../firebase/firebase";
import { put, call } from 'redux-saga/effects'

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAILURE = "VERIFY_FAILURE";



const requestLogin = (email: string, password: string) => {
  return {
    type: LOGIN_REQUEST,
    payload: { e: email, p: password }
  };
};

const receiveLogin = (user: any) => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginError = (error: { code: string, message: string, a: null }) => {
  return {
    type: LOGIN_FAILURE,
    payload: error.code
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = (error: { code: string, message: string, a: null }) => {
  return {
    type: LOGOUT_FAILURE,
    payload: error.code
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

const verifyError = (error: { code: string, message: string, a: null }) => {
    return {
      type: VERIFY_FAILURE,
      payload: error.code
    };
  };


// login

export function* sagaLoginWorker(action: {payload: {e: string, p: string}, type: string}) {
    try {
      const payload = yield call(() => fetchAuth(action.payload.e, action.payload.p))
      yield put(receiveLogin(payload))
    } catch (e) {
      yield put(loginError(e))
    }
}

async function fetchAuth(e: string, p: string) {
    const response = await myFirebase.auth().signInWithEmailAndPassword(e, p)
    return response
}

// logout


export function* sagaLogoutWorker(action: {payload: {e: string, p: string}, type: string}) {
    try {
      const payload = yield call(() => fetchLogout())
      yield put(receiveLogout())
    } catch (e) {
      yield put(logoutError(e))
    }
}

async function fetchLogout() {
    const response = await myFirebase.auth().signOut()
    return response
}


// verify


export function* sagaVerifyWorker(action: {payload: {e: string, p: string}, type: string}) {
    try {
      const payload = yield call(() => fetchVerify())
      // yield put(receiveLogout())
    } catch (e) {
      yield put(verifyError(e))
    }
}

async function fetchVerify() {
    const response = await myFirebase.auth().onAuthStateChanged(user => {
        
        if (user !== null) {
          put(receiveLogin(user));
        } 
        
        put(verifySuccess());
      });
    return response
}


/*

export function loginUser(email: string, password: string) { 
  return dispatch => {
    dispatch(requestLogin());
    myFirebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        const id = user.user.uid
        dispatch(receiveLogin(user));
      })
      .catch(error => {
        //Do something with the error if you want!
        dispatch(loginError());
      });
  }
};


export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    myFirebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(receiveLogout());
      })
      .catch(error => {
        //Do something with the error if you want!
        dispatch(logoutError());
      });
  }
};


export function verifyAuth() { 
  return dispatch => {
    dispatch(verifyRequest());
    myFirebase
      .auth()
      .onAuthStateChanged(user => {
        
        if (user !== null) {
          dispatch(receiveLogin(user));
        } 
        
        dispatch(verifySuccess());
      });
  }
};

*/