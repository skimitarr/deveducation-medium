import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRoom, ISomeSliceState } from '../components/Interfaces';

const someSlice = createSlice({
  name: 'accounts&rooms',
  initialState: {
    allAccounts: {},
    allRooms: [],
    isLoading: false,
  } as ISomeSliceState,
  reducers: {
    getAccountsFetch(state) {
      state.isLoading = true
    },
    getAccounts(state, action) {
      state.isLoading = false
      state.allAccounts = action.payload;
    },
    getRoomsFetch(state) {
      state.isLoading = true
    },
    getRooms(state, action: PayloadAction<IRoom[]>) {
      state.isLoading = false
      state.allRooms = action.payload;
    },
  }
})

export const { getAccountsFetch, getAccounts, getRoomsFetch, getRooms } = someSlice.actions;
export default someSlice.reducer;

