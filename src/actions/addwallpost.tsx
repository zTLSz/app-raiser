import { myFirebase, db } from "../firebase/firebase";
import { put, call } from 'redux-saga/effects'
import firebase from 'firebase'



export const ADD_WALL_POST_REQUEST = "ADD_WALL_POST_REQUEST";
export const ADD_WALL_POST_SUCCESS = "ADD_WALL_POST_SUCCESS";
export const ADD_WALL_POST_FAILURE = "ADD_WALL_POST_FAILURE";





export const requestAddWallPost = (email: string, password: string) => {
  return {
    type: ADD_WALL_POST_REQUEST,
    payload: { e: email, p: password }
  };
};

export const receiveAddWallPost = (data: any) => {
  return {
    type: ADD_WALL_POST_SUCCESS,
    payload: data
  };
};

export const addWallPostError = (error: { code: string, message: string, a: null }) => {
  return {
    type: ADD_WALL_POST_FAILURE,
    payload: error.code
  };
};




export function* sagaAddWallPostWorker(action: {payload: {e: string, p: string}, type: string}) {
    try {
      const payload = yield call(() => fetchReg(action.payload.e, action.payload.p))
      const usercounter = yield call(() => checkUserCount())
      yield call(() => addUserInfo(action.payload.e, usercounter))
      // yield call(() => addUserSystemData(payload.user.uid, action.payload.e, usercounter))
      //yield put(receiveReg(payload))
    } catch (e) {
      // yield put(regError(e))
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


/*

        async function test22() {
            const response = await db.collection("userwall").doc(`8`).set({
                posts: [
                    {
                        author: 1,
                        text: '1111',
                        time: 0,
                        likes: 0
                    },
                    {
                        author: 2,
                        text: '1211',
                        time: 0,
                        likes: 0
                    }
                ]
            })
            
        }

        test22()
*/