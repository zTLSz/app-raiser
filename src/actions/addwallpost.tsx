import { db } from "../firebase/firebase";
import { put, call, takeEvery } from "redux-saga/effects";
import firebase from "firebase";
import { requestGetWallPosts } from "./getWallPosts";

export const ADD_WALL_POST_REQUEST = "ADD_WALL_POST_REQUEST";
export const ADD_WALL_POST_SUCCESS = "ADD_WALL_POST_SUCCESS";
export const ADD_WALL_POST_FAILURE = "ADD_WALL_POST_FAILURE";

export const requestAddWallPost = (
  text: string,
  date: number,
  counter: number,
  author: number,
  name: string
) => {
  return {
    type: ADD_WALL_POST_REQUEST,
    payload: {
      text: text,
      date: date,
      counter: counter,
      author: author,
      name: name,
    },
  };
};

export const receiveAddWallPost = (data: any) => {
  return {
    type: ADD_WALL_POST_SUCCESS,
    payload: data,
  };
};

export const addWallPostError = (error: {
  code: string;
  message: string;
  a: null;
}) => {
  return {
    type: ADD_WALL_POST_FAILURE,
    payload: error.code,
  };
};

interface AddWallTypes {
  text: string;
  date: number;
  counter: number;
  author: number;
  name: string;
}

export function* sagaAddWallPostWorker(action: {
  payload: AddWallTypes;
  type: string;
}): Generator {
  const { text, date, counter, author, name } = action.payload;

  try {
    if (text.length < 3) {
      throw new Error();
    }
    const payload = yield call(() =>
      requestAddWallPost(text, date, counter, author, name)
    );
    yield call(() => addPost(action.payload));
    yield put(requestGetWallPosts(counter, author));
    yield put(receiveAddWallPost(payload));
  } catch (e: any) {
    yield put(addWallPostError(e));
  }
}

async function addPost(payload: AddWallTypes) {
  const { text, date, counter, author, name } = payload;
  const response = await db
    .collection("userwall")
    .doc(`${counter}`)
    .collection("posts")
    .doc()
    .set({
      author: author,
      authorName: name,
      text: text,
      date: date,
      counter: counter,
      likes: 0,
      dislikes: 0,
    });
}
