import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit';

import { db } from '../firebase'
import  {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { IItem } from '../components/Interfaces';
import { getAccounts, getRooms } from '../store/SomeSlice'

async function watchRooms() {
  const queryCollection = query(collection(db, 'deveducation-medium'));
  let item = {};

  await new Promise<void>((resolve) => {
    const unsubscribe = onSnapshot(queryCollection, (data) => {
      data.forEach((i) => {
        item = {...i.data()};
        // console.log(item);
      });
      resolve();
    });
    return () => unsubscribe();
  });
  return (item);
}

function* workGetRooms() {
  const item: IItem = yield call(() => watchRooms());
  yield put(getRooms(item.Rooms));
  yield put(getAccounts(item.Accounts));
}

export function* roomSaga() {
  yield takeLatest('accounts&rooms/getRoomsFetch', workGetRooms)
}

function* workAddDataUser(action: PayloadAction<{ username: string, password: string }>) {
  yield localStorage.setItem('user', JSON.stringify(action.payload));
}

export function* addDataUserSaga() {
  yield takeEvery('accounts&rooms/userLocalSaveData', workAddDataUser)
}

function* workDeleteDataUser() {
  yield localStorage.clear();
}

export function* deleteDataUserSaga() {
  yield takeEvery('accounts&rooms/userLocalDeleteData', workDeleteDataUser)
}

