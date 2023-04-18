import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ticket} from '../../types/ticket';

const initialState: ticket = {
  date: '',
  start: '',
  finish: '',
  firmName: '',
  firmType: 'transport',
  no: '',
  userName: '',
  name: '',
  price: 0,
};

const userSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setStart: (state, action: PayloadAction<string>) => {
      state.start = action.payload;
    },
    setFinish: (state, action: PayloadAction<string>) => {
      state.finish = action.payload;
    },
    setFirmName: (state, action: PayloadAction<string>) => {
      state.firmName = action.payload;
    },
    setFirmType: (state, action: PayloadAction<'trasnport' | 'hotel'>) => {
      state.firmName = action.payload;
    },
    setNo: (state, action: PayloadAction<string>) => {
      state.no = action.payload;
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
  },
});

export const {
  setDate,
  setFinish,
  setUserName,
  setFirmName,
  setFirmType,
  setNo,
  setStart,
  setPrice,
} = userSlice.actions;

export default userSlice.reducer;
