import { Action } from 'redux';
import { createActions, handleActions } from 'redux-actions';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import BookService from '../../services/BookService';
import { IBook, BooksState } from '../../types';

const initialState: BooksState = {
  books: null,
  loading: false,
  error: null,
};

const prefix = 'book_shelf/books';

export const { pending, success, fail } = createActions(
  'PENDING',
  'SUCCESS',
  'FAIL',
  { prefix }
);

const reducer = handleActions<BooksState, IBook[]>(
  {
    PENDING: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      ...state,
      loading: false,
      books: action.payload,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;

// saga

export const { getBooks } = createActions('GET_BOOKS', { prefix });

function* getBooksSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const books: IBook[] = yield call(BookService.getBooks, token);
    yield put(success(books));
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

export function* booksSaga() {
  // 중복된 호출 중 가장 마지막 것만 취득
  yield takeLatest(`${prefix}/GET_BOOKS`, getBooksSaga);
}