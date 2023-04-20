import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {hotel} from '../../types/hotel';

const initialState: hotel = {
  firmName: '',
  city: '',
  firmType: 'hotel',
  roomNo: '',
  date: '',
  price: 0,
  name: '',
  userName: '',
};

const userSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setFirmName: (state, action: PayloadAction<string>) => {
      state.firmName = action.payload;
    },
    setRoomNo: (state, action: PayloadAction<string>) => {
      state.roomNo = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },

    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const {
  setDate,
  setUserName,
  setFirmName,
  setPrice,
  setName,
  setRoomNo,
  setCity,
} = userSlice.actions;

export default userSlice.reducer;
