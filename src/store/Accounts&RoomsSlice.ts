import { createSlice } from '@reduxjs/toolkit';
import { IAccountsRoomsSliceState } from '../components/Interfaces';

const accountsRoomsSlice = createSlice({
  name: 'accounts&rooms',
  initialState: {
    allAccounts: {},
    allRooms: [],
  } as IAccountsRoomsSliceState,
  reducers: {
    getAccounts(state, action) {
      state.allAccounts = action.payload;
    },
    getRooms(state, action) {
      state.allRooms = action.payload;
    },
  },
});

export const { getAccounts, getRooms } = accountsRoomsSlice.actions;
export default accountsRoomsSlice.reducer;
