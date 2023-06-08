import { createSlice } from '@reduxjs/toolkit';
import { ISomeSliceState } from '../components/Interfaces';

const someSlice = createSlice({
  name: 'accounts&rooms',
  initialState: {
    allAccounts: {},
    allRooms: [],
  } as ISomeSliceState,
  reducers: {
    getAccounts(state, action) {
      state.allAccounts = action.payload;
    },
    getRooms(state, action) {
      state.allRooms = action.payload;
    },
  },
});

export const { getAccounts, getRooms } = someSlice.actions;
export default someSlice.reducer;
