import { db } from "../../firebase/firebase";
import { put, call, takeEvery } from 'redux-saga/effects'
import firebase from 'firebase'
import { requestCheckSubscribeUser } from './chechSubscribeUser'
import { requestGetProfile } from '../getProfile'



export const SUBSCRIBE_USER_REQUEST = "SUBSCRIBE_USER_REQUEST";
export const SUBSCRIBE_USER_SUCCESS = "SUBSCRIBE_USER_SUCCESS";
export const SUBSCRIBE_USER_FAILURE = "SUBSCRIBE_USER_FAILURE";





export const requestSubscribeUser =  (subscribingUserId: number, subscribingUserName: string, 
                                      subscribeTargetId: number, subscribeTargetName: string) => {
  return {
    type: SUBSCRIBE_USER_REQUEST,
    payload: {  subscribingUserId: subscribingUserId, 
                subscribingUserName: subscribingUserName, 
                subscribeTargetId: subscribeTargetId, 
                subscribeTargetName: subscribeTargetName
              }
  };
};

export const receiveSubscribeUser = (data: any) => {
  return {
    type: SUBSCRIBE_USER_SUCCESS,
    payload: data
  };
};

export const subscribeUserError = (error: { code: string, message: string }) => {
  return {
    type: SUBSCRIBE_USER_FAILURE,
    payload: error.code
  };
};

interface SubscribeUserTypes {
    subscribingUserId: number, 
    subscribingUserName: string, 
    subscribeTargetId: number, 
    subscribeTargetName: string
}


export function* sagaSubscribeUser(action: { payload: SubscribeUserTypes, type: string }) {
    const { subscribingUserId, subscribingUserName, subscribeTargetId, subscribeTargetName } = action.payload

    try {
      const payload = yield call(() => requestSubscribeUser(subscribingUserId, subscribingUserName, subscribeTargetId, subscribeTargetName))
      yield call(() => addFollower(action.payload))
      yield call(() => addFollowing(action.payload))
      yield put(requestCheckSubscribeUser(subscribingUserId, subscribeTargetId))
      yield put(requestGetProfile(subscribeTargetId))
      yield put(receiveSubscribeUser(payload))
    } catch (e) {
      yield put(subscribeUserError(e))
    }
}



async function addFollower(payload: SubscribeUserTypes) {
  const { subscribingUserId, subscribingUserName, subscribeTargetId, subscribeTargetName } = payload


  const response = await db.collection("userinfo").doc(`${subscribeTargetId}`).update({
    followers: firebase.firestore.FieldValue.increment(1)
  })
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
  const addFollowerdb = await db.collection("userinfo")
                        .doc(`${subscribeTargetId}`).collection("followers")
                        .doc(`${subscribingUserId}`).set({
                          id: subscribingUserId,
                          name: subscribingUserName,
                          userinfo: db.doc(`/userinfo/${subscribingUserId}`)
                        })


}


async function addFollowing(payload: SubscribeUserTypes) {
  const { subscribingUserId, subscribingUserName, subscribeTargetId, subscribeTargetName } = payload


  const response = await db.collection("userinfo").doc(`${subscribingUserId}`).update({
    following: firebase.firestore.FieldValue.increment(1)
  })
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
  const addFollowingdb = await db.collection("userinfo")
                        .doc(`${subscribingUserId}`).collection("following")
                        .doc(`${subscribeTargetId}`).set({
                          id: subscribeTargetId,
                          name: subscribeTargetName,
                          userinfo: db.doc(`/userinfo/${subscribeTargetId}`)
                        })


}