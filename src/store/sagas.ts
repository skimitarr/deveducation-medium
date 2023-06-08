import { call, put, takeLatest } from 'redux-saga/effects';
import { collection, onSnapshot, query } from 'firebase/firestore';
import moment from 'moment';

import { db } from '../firebase';
import { IItem, IRoom } from '../components/Interfaces';
import { getAccounts, getRooms } from '../store/SomeSlice';

async function watchRooms() {
  const now = moment().format('YYYY-MM-DD');
  const yesterday = moment(now).subtract(1, 'd').format('YYYY-MM-DD');
  const queryCollection = query(collection(db, 'deveducation-medium'));
  let item = {};

  await new Promise<void>((resolve) => {
    const unsubscribe = onSnapshot(queryCollection, (data) => {
      data.forEach((i) => {
        const rooms = i.data().Rooms.map((room: IRoom) => {
          const dateChakeIn = moment(room.checkInDate);
          if (dateChakeIn.isValid() && dateChakeIn.isBefore(yesterday)) {
            room = { ...room, guest: '' };
          }
          return room;
        });
        item = { ...i.data(), Rooms: rooms };
      });
      resolve();
    });
    return () => unsubscribe();
  });
  return item;
}
// ----------------------------------getRooms
export function getRoomsAction() {
  return {
    type: 'accounts&rooms/getRoomsFetch',
  };
}

export function* roomSaga() {
  yield takeLatest('accounts&rooms/getRoomsFetch', workGetRooms);
}

function* workGetRooms() {
  const item: IItem = yield call(() => watchRooms());
  yield put(getRooms(item.Rooms));
  yield put(getAccounts(item.Accounts));
}

// ----------------------------------addDataUser
// export function addDataUserAction(data: { username: string; password: string }) {
//   return {
//     type: 'accounts&rooms/userLocalSaveData',
//     payload: data,
//   };
// }

// export function* addDataUserSaga() {
//   yield takeEvery('accounts&rooms/userLocalSaveData', workAddDataUser);
// }

// function* workAddDataUser(action: PayloadAction<{ username: string; password: string }>) {
//   yield localStorage.setItem('user', JSON.stringify(action.payload));
// }

// ----------------------------------deleteDataUser
// export function deleteDataUserAction() {
//   return {
//     type: 'accounts&rooms/userLocalDeleteData',
//   };
// }

// export function* deleteDataUserSaga() {
//   yield takeEvery('accounts&rooms/userLocalDeleteData', workDeleteDataUser);
// }

// function* workDeleteDataUser() {
//   yield localStorage.clear();
// }

// ----------------------------------checkIsUserRegistered
// export function isUserAction() {
//   return {
//     type: 'accounts&rooms/isUserTrue',
//   };
// }

// export function* isUserSaga() {
//   yield takeEvery('accounts&rooms/isUserTrue', workIsUser);
// }

// function* workIsUser() {
//   yield put(isUser(true));
// }
