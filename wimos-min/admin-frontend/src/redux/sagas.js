import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import adminDataSagas from "./adminData/saga";
import todoSagas from "./todo/saga";
import chatSagas from "./chat/saga";
import surveyListSagas from "./surveyList/saga";
import surveyDetailSagas from "./surveyDetail/saga";

export default function* rootSaga() {
  yield all([
    authSagas(),
    adminDataSagas(),
    todoSagas(),
    chatSagas(),
    surveyListSagas(),
    surveyDetailSagas(),
  ]);
}
