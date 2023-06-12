import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { roomSaga } from './sagas';
import accountsRoomsSlice from './Accounts&RoomsSlice';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    accountsRooms: accountsRoomsSlice,
  },
  middleware: [saga],
});

saga.run(roomSaga);

export default store;
