import { takeEvery } from "redux-saga/effects";
import { sagaRegWorker, REG_REQUEST } from "../auth/reg";
import {
  sagaLoginWorker,
  LOGIN_REQUEST,
  sagaVerifyWorker,
  VERIFY_REQUEST,
  sagaLogoutWorker,
  LOGOUT_REQUEST,
} from "../auth/auth";
import {
  sagaEditProfileWorker,
  USER_EDIT_REQUEST,
} from "../profile/editProfile";
import {
  sagaEditProfilePicWorker,
  USER_PIC_EDIT_REQUEST,
} from "../profile/editUserPic";
import {
  sagaGetProfileWorker,
  GET_PROFILE_REQUEST,
} from "../profile/getProfile";
import {
  sagaAddWallPostWorker,
  ADD_WALL_POST_REQUEST,
} from "../wall/addwallpost";
import {
  sagaGetWallPostsWorker,
  GET_WALL_POSTS_REQUEST,
} from "../wall/getWallPosts";
import {
  sagaSetPostLike,
  SET_POST_LIKE_REQUEST,
} from "../postlikes/setPostLike";
import {
  sagaDeletePostLike,
  REMOVE_POST_LIKE_REQUEST,
} from "../postlikes/deletePostLike";
import {
  sagaGetPostLike,
  GET_POST_LIKE_REQUEST,
} from "../postlikes/getPostLike";
import {
  sagaSubscribeUser,
  SUBSCRIBE_USER_REQUEST,
  SUBSCRIBE_USER_SUCCESS,
} from "../subscribe/subscribeUser";
import {
  sagaCheckSubscribeUser,
  CHECK_SUBSCRIBE_USER_REQUEST,
} from "../subscribe/chechSubscribeUser";
import {
  sagaUnsubscribeUser,
  UNSUBSCRIBE_USER_REQUEST,
  UNSUBSCRIBE_USER_SUCCESS,
} from "../subscribe/unsubscribeUser";
import {
  sagaGetSubscribersList,
  GET_SUBSCRIBERS_LIST_REQUEST,
} from "../subscribe/getSubscribersList";

export function* rootSaga() {
  yield takeEvery(REG_REQUEST, sagaRegWorker);
  yield takeEvery(LOGIN_REQUEST, sagaLoginWorker);
  yield takeEvery(VERIFY_REQUEST, sagaVerifyWorker);
  yield takeEvery(LOGOUT_REQUEST, sagaLogoutWorker);

  yield takeEvery(USER_EDIT_REQUEST, sagaEditProfileWorker);
  yield takeEvery(USER_PIC_EDIT_REQUEST, sagaEditProfilePicWorker);
  yield takeEvery(GET_PROFILE_REQUEST, sagaGetProfileWorker);

  yield takeEvery(ADD_WALL_POST_REQUEST, sagaAddWallPostWorker);
  yield takeEvery(GET_WALL_POSTS_REQUEST, sagaGetWallPostsWorker);

  yield takeEvery(SET_POST_LIKE_REQUEST, sagaSetPostLike);
  yield takeEvery(REMOVE_POST_LIKE_REQUEST, sagaDeletePostLike);
  yield takeEvery(GET_POST_LIKE_REQUEST, sagaGetPostLike);

  yield takeEvery(SUBSCRIBE_USER_REQUEST, sagaSubscribeUser);
  yield takeEvery(CHECK_SUBSCRIBE_USER_REQUEST, sagaCheckSubscribeUser);
  yield takeEvery(CHECK_SUBSCRIBE_USER_REQUEST, sagaVerifyWorker);
  yield takeEvery(UNSUBSCRIBE_USER_REQUEST, sagaUnsubscribeUser);
  yield takeEvery(GET_SUBSCRIBERS_LIST_REQUEST, sagaGetSubscribersList);
}
