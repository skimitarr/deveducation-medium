import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRoom, ISomeSliceState } from '../components/Interfaces';

const someSlice = createSlice({
  name: 'accounts&rooms',
  initialState: {
    allAccounts: {},
    allRooms: [],
    isLoading: false,
    userData: { username: '', password: '' }
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
    userLocalSaveData(state, action: PayloadAction<{ username: string, password: string }>) {
      state.isLoading = true
      state.userData = action.payload;
    },
    userLocalDeleteData(state) {
      state.isLoading = true
    }
  }
})

export const {
  getAccountsFetch,
  getAccounts,
  getRoomsFetch,
  getRooms,
  userLocalSaveData,
  userLocalDeleteData
} = someSlice.actions;
export default someSlice.reducer;

