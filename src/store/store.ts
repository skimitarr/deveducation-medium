import { configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import { roomSaga } from './sagas';

import someReducer from './SomeSlice';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    some: someReducer,
  },
  middleware: [saga],
});

saga.run(roomSaga);

export default store;
