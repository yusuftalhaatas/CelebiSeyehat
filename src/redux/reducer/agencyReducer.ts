import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {agency, hotel, transport} from '../../types/agency';

const initialState: agency = {
  name: '',
  transport: [],
  hotels: [],
};

const agencySlice = createSlice({
  name: 'agency',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setTransport: (state, action: PayloadAction<Array<transport>>) => {
      state.transport = action.payload;
    },
    setHotel: (state, action: PayloadAction<Array<hotel>>) => {
      state.hotels = action.payload;
    },
  },
});

export const {setName, setHotel, setTransport} = agencySlice.actions;

export default agencySlice.reducer;
