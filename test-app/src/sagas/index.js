import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { fetchcoordinator, fetchcoordinatorSuccess, fetchresponsible, fetchresponsibleSuccess } from "../actions";
import { getCordinator, getResponsible } from "../services/api";
import { fieldTypes } from "../util/api";


  function* handleFetchCoordinator() {
    try {
      const res = yield call(getCordinator)
      const payload = res ? res.data : {}
      yield put(fetchcoordinatorSuccess(payload));
    } catch (err) {
      console.error(err);
    }
  }

  function* handleFetchResponsible() {
    try {
      const res = yield call(getResponsible)
      const payload = res ? res.data : {}
      yield put(fetchresponsibleSuccess(payload));
    } catch (err) {
      console.error(err);
    }
  }
  
  function* watchFetchCoordinator() {
    yield takeLatest(fieldTypes.FETCH_COORDINATOR, handleFetchCoordinator);
  }
  
  function* watchFetchResponsible() {
    yield takeLatest(fieldTypes.FETCH_RESPONSIBLE, handleFetchResponsible);
  }

  function* Saga() {
    yield all([fork(watchFetchCoordinator), fork(watchFetchResponsible)]);
  }
  
  export default Saga;