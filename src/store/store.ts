import { configureStore } from '@reduxjs/toolkit'

import createSagaMiddleware from 'redux-saga'
import { roomSaga, addDataUserSaga, deleteDataUserSaga } from './sagas'

import someReducer from './SomeSlice'

const saga = createSagaMiddleware()

const store = configureStore({
  reducer: {
    some: someReducer,
  },
  middleware: [saga]
});

saga.run(roomSaga)
saga.run(addDataUserSaga)
saga.run(deleteDataUserSaga)

export default store;

