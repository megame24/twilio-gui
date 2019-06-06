import { all } from 'redux-saga/effects';
import {
  watchLoginSuccess,
  watchOnPersistLogin,
} from './userSaga';

/**
 * export all the watchers to the sagaMiddleware
 * @returns {undefined}
 */
export default function* rootSaga() {
  yield all([
    watchLoginSuccess(),
    watchOnPersistLogin(),
  ]);
}
