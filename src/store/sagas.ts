import { call, put, takeLatest } from 'redux-saga/effects';
import { collection, onSnapshot, query } from 'firebase/firestore';
import moment from 'moment';

import { db } from '../firebase';
import { IItem, IRoom } from '../components/Interfaces';
import { getAccounts, getRooms } from './Accounts&RoomsSlice';

async function watchRooms() {
  const now = moment().format('YYYY-MM-DD');
  const queryCollection = query(collection(db, 'deveducation-medium'));
  let item = {};

  await new Promise<void>((resolve) => {
    const unsubscribe = onSnapshot(queryCollection, (data) => {
      data.forEach((i) => {
        const rooms = i.data().Rooms.map((room: IRoom) => {
          const dateChakeIn = moment(room.checkInDate);
          if (dateChakeIn.isValid() && dateChakeIn.isSameOrBefore(now)) {
            room = { ...room, checkInDate: null, guest: '', isCheckedIn: false };
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
